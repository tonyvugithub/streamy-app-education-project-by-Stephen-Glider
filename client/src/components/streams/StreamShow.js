import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../store/actions';

const StreamShow = ({
  fetchStream,
  match: {
    params: { id },
  },
  stream,
}) => {
  //create a ref to refer to the video component
  const videoRef = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    fetchStream(id);
    buildPlayer();
  }, []);

  //Call build player if the stream is successfully fetched/updated
  //The return function is for cleaning up the player after we navigate to
  //different page aka StreamShow component unmount
  useEffect(() => {
    buildPlayer();
    return () => {
      if (player.current) {
        player.current.destroy();
      }
    };
  }, [stream]);

  //Clean up the player when component unmount

  //This function is to tell React that we only attach
  //the video player if we have a stream info has been fetched
  const buildPlayer = () => {
    //If the player is already exist or stream is not fetched then do nothing
    if (player.current || !stream) {
      return;
    }
    player.current = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    player.current.attachMediaElement(videoRef.current);
    player.current.load();
  };

  //Loading component
  if (!stream) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  );
};

const mapStateToShow = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToShow, { fetchStream })(StreamShow);
