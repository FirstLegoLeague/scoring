var logMock = jasmine.createSpy('log');
logMock.get = jasmine.createSpy('log.get').and.returnValue('log-content');
