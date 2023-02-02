import { storiesOf } from '@storybook/react'
import { Test } from './Test'
import { TestProps} from './Test.d'
import {FC} from "react";

export default {
	title: 'Components/Test',
	component: Test,
}

export const Template : FC<TestProps> = ({ string = 'placeholder', number= 42}) => <Test string={string} number={number} />
Template.bind({ string: 'plac'})
export const OtherTest : FC<TestProps> = ({}) => <Test string='string' number={2}/>
