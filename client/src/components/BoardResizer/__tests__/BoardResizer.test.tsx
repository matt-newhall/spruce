import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BoardResizer } from '..'
import { BOARD_SIZE_MAX, BOARD_SIZE_MIN } from '../../../constants'

const setBoardSize = jest.fn()
const startGame = jest.fn()

describe('BoardResizer', () => {
  test('renders BoardResizer and displays default size', () => {
    render(<BoardResizer boardSize={5} setBoardSize={setBoardSize} startGame={startGame} />)

    expect(screen.getByText('Choose Board Size')).toBeInTheDocument()
    expect(screen.getByText('5 x 5')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toHaveAttribute('min', `${BOARD_SIZE_MIN}`)
    expect(screen.getByRole('slider')).toHaveAttribute('max', `${BOARD_SIZE_MAX}`)
  })

  test('calls setBoardSize when slider changes', () => {
    render(<BoardResizer boardSize={3} setBoardSize={setBoardSize} startGame={startGame} />)

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '4' } })
    expect(setBoardSize).toHaveBeenCalledWith(4)
  })

  test('calls startGame when button is clicked', () => {
    render(<BoardResizer boardSize={3} setBoardSize={setBoardSize} startGame={startGame} />)

    fireEvent.click(screen.getByText('Start Game'))
    expect(startGame).toHaveBeenCalled()
  })
})