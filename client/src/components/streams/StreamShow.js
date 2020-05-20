import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../store/actions';

const StreamShow = ({
  fetchStream,
  match: {
    params: { id },
  },
  stream,
}) => {
  useEffect(() => {
    fetchStream(id);
  }, []);

  if (!stream) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
