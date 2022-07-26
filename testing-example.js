import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from '../fetch'

const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({ greeting: 'hello there' }))
    }),
)

// You dont want to let the outcomeo fo ne test to affect the outcome of  another.

describe("Example Page")

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe()

test('loads and displays greeting', async () => {
    render(<Fetch url="/greeting" />)

    fireEvent.click(screen.getByText('Load Greeting'))

    await waitFor(() => screen.getByRole('heading'))

    expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async () => {
    server.use(
        rest.get('/greeting', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
    )

    render(<Fetch url="/greeting" />)

    fireEvent.click(screen.getByText('Load Greeting'))

    await waitFor(() => screen.getByRole('alert'))

    // Tests should always end in an "expect" call. 
    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
    expect(screen.getByRole('button')).not.toBeDisabled()

    //Roles are part of accessibility
})