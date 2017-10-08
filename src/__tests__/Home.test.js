import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../client/components/common/Home';

Enzyme.configure({ adapter: new Adapter() });
it( 'homepage should render', () => {
    const component = shallow( <Home /> );
    expect( component ).toMatchSnapshot();
} );