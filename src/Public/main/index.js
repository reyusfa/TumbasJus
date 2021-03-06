import { Component } from 'react';
import { connect } from 'react-redux';

class index extends Component {
  componentDidMount() {
    const { auth, navigation } = this.props;
    if (auth.data.token) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Auth');
    }
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(index);
