
import React from 'react';
import { Link } from 'react-router';

export default class extends Link {
  
  render() {
    return (<Link {...this.props}/>);
  }
}
