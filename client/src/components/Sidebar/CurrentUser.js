import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { BadgeAvatar } from './index';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { logout } from '../../store/utils/thunkCreators';
import { clearOnLogout } from '../../store/index';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: 'flex',
    alignItems: 'center',
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 17,
  },
  ellipsis: {
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
    },
    color: '#95A7C4',
    marginRight: 24,
    opacity: 0.5,
  },
}));

const CurrentUser = (props) => {
  const classes = useStyles();
  const user = props.user || {};

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await props.logout(user.id);
  };

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>

        <MoreHorizIcon
          classes={{ root: classes.ellipsis }}
          aria-controls="drop-down"
          aria-haspopup="true"
          onClick={handleClick}
        />
        <Menu
          id="drop-down"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
