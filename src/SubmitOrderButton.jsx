import React from 'react';

function SubmitOrderButton(props) {
  const {canSubmit} = props;
  return <input type="submit" value="Purchase Now" disabled={!canSubmit} />
}

export default SubmitOrderButton;