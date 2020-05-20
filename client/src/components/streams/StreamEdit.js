import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../store/actions';
import StreamForm from './StreamForm';

const StreamEdit = ({ fetchStream, stream, match, editStream }) => {
  useEffect(() => {
    fetchStream(match.params.id);
  }, []);

  const onSubmit = (formValues) => {
    editStream(match.params.id, formValues);
  };

  if (!stream) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        onSubmit={onSubmit}
        initialValues={_.pick(stream, ['title', 'description'])}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
