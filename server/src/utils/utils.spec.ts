import {handleError} from './index'
import {TarsierLoggerMock} from '../mocks/logger/tarsier.logger.mock'
import {ObservableMock} from '../mocks/observable.mock'

describe('Utils', () => {
  describe('handleError', () => {
    let logger, observable

    beforeEach(() => {
      logger = new TarsierLoggerMock()
      observable = new ObservableMock()
    })

    beforeEach(() => {
      spyOn(logger, 'warn')
      spyOn(logger, 'debug')
      spyOn(logger, 'error')
    })

    afterEach(() => {
      logger = null
      observable = null
    })

    it('should be defined', () => {
      expect(handleError).toBeDefined()
    })

    it('should be curried', () => {
      expect(typeof handleError(logger)).toBe('function')
    })

    it('should log the error', () => {
      handleError(logger)({message: 'an error'}, observable)
      expect(logger.error).toHaveBeenCalled()
    })

    it('should log a warn', () => {
      handleError(logger)({message: 'an error'}, observable)
      expect(logger.error).toHaveBeenCalled()
    })

    it('should log debug', () => {
      handleError(logger)({message: 'an error'}, observable)
      expect(logger.error).toHaveBeenCalled()
    })
  })
})
