const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    // test skelton " test('should run', () => expect().toBe(//.toBe is the method, in () should be expected return value))
    test('should run', () => { 
        expect(shuffleArray).toHaveLength(1)
    })
    test('should run', () => { 
        expect.arrayContaining(shuffleArray)
    })
    test('should run', () => { 
        expect(shuffleArray).toMatchSnapshot()
    })
})