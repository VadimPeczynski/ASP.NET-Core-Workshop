import { SecretPipe } from './secret.pipe';

describe('SecretPipe', () => {
  it('create an instance', () => {
    const pipe = new SecretPipe();
    expect(pipe).toBeTruthy();
  });
});
