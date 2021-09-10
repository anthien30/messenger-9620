import React, { useState } from 'react';
import { FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { postMessage } from '../../store/utils/thunkCreators';

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
  },
  icon: {
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
    },
    color: '#95A7C4',
    marginRight: theme.spacing(3),
    opacity: 0.5,
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
    };

    await postMessage(reqBody);
    setText('');
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          autoComplete="off"
          endAdornment={
            <InputAdornment position="end">
              <SentimentSatisfiedOutlinedIcon className={classes.icon} />
              <FilterNoneIcon
                className={classes.icon}
                style={{ transform: 'rotate(90deg)' }}
              />
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
