import gameInfo from './gameInfo.js';
import invite from './invite.js';
import optin from './optin.js';
import rps from './rps.js';
import setAddress from './setAddress.js';

const commands = [gameInfo, invite, optin, rps, setAddress];

describe('Command Registration Files', () => {

  test('should have required fields', () => {
    commands.forEach(command => {
      expect(command).toHaveProperty('name');
      expect(command).toHaveProperty('description');
      expect(typeof command.name).toBe('string');
      expect(typeof command.description).toBe('string');
    });
  });

  test('should have unique command names', () => {
    const commandNames = commands.map(command => command.name);
    const uniqueNames = [...new Set(commandNames)];
    expect(commandNames.length).toBe(uniqueNames.length);
  });

  test('should validate options if present', () => {
    commands.forEach(command => {
      if (command.options) {
        expect(Array.isArray(command.options)).toBe(true);
        command.options.forEach(option => {
          expect(option).toHaveProperty('name');
          expect(option).toHaveProperty('description');
          expect(option).toHaveProperty('type');
          expect(typeof option.name).toBe('string');
          expect(typeof option.description).toBe('string');
          expect(typeof option.type).toBe('number');
        });
      }
    });
  });

});
