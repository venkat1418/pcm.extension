import { shallow } from 'enzyme';
import React from 'react';
import {TopMenu} from "../../../components/TopMenu";

test('Test the renders of TopMenu', () => {
   const wrapper = shallow(<TopMenu />);
   //Create a snapshot with the default render of the component
   expect(wrapper).toMatchSnapshot();

   // set the state explicitly and create a snapshot again to check the changes with updated state
   wrapper.setState({noOfOpenStories:5});
   expect(wrapper).toMatchSnapshot();

  // This method is called from LeftPanelContainer .
   // Call the asynchrnous method and observe the changes in state
   wrapper.instance().setEmptyStoryMesage(4);
   expect(wrapper.state().noOfOpenStories).toBe(4);
});
