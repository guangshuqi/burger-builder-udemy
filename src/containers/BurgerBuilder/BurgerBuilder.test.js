import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });
const onSetInitialIngredients = jest.fn()
describe('<BurgerBuilder/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onSetInitialIngredients={onSetInitialIngredients} />)
    })
    it('should render <BuildControls/> when recieving ingredients', () => {
        wrapper.setProps({
            ingredients: {
                salad: 0
            }
        })
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})