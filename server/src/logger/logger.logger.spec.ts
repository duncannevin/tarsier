import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs'
import { bindCallback } from 'rxjs'
import {TarsierLogger} from './tarsier.logger'

describe('LoggerService', () => {
  let appendFileSpy, bindCallbackSpy, service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TarsierLogger],
      exports: [TarsierLogger]
    }).compile();

    service = module.resolve<TarsierLogger>(TarsierLogger);
  });

  beforeEach(() => {
    const mockers = {
      bc: bindCallback
    }

    appendFileSpy = jest.spyOn(fs, 'appendFile')
    appendFileSpy.mockImplementation(() => Promise.resolve)
    bindCallbackSpy = jest.spyOn(mockers, 'bc')
    bindCallbackSpy.mockImplementation(() => {})
  })

  afterEach(() => {
    appendFileSpy = null
    bindCallbackSpy = null
    service = null
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have set context method', async () => {
    const instance = await service
    jest.spyOn(instance, 'setContext')
    instance.setContext('fooBar')
    expect(instance.setContext).toHaveBeenCalledWith('fooBar')
  })

  it('should log error', async () => {
    const instance = await service
    const msg = 'some dang error'
    instance.setContext('bla')
    instance.error(msg)
    expect(fs.appendFile).toHaveBeenCalled()
  })

  it('should log warning', async () => {
    const instance = await service
    const msg = 'some dang warning'
    instance.setContext('bla')
    instance.warn(msg)
    expect(fs.appendFile).toHaveBeenCalled()
  })

  it('should log debug', async () => {
    const instance = await service
    const msg = 'some da..debug'
    instance.setContext('bla')
    instance.debug(msg)
    expect(fs.appendFile).toHaveBeenCalled()
  })
});
