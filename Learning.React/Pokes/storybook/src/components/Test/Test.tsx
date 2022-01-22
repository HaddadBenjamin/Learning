import React, {FC} from 'react'
import { TestProps } from './test.d'

export const Test : FC<TestProps> = ({a, b}) => <div>Hello World{a}{b}</div>