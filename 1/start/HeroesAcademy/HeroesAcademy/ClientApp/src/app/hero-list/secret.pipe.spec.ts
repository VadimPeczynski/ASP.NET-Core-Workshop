import { SecretPipe } from './secret.pipe';

describe('SecretPipePipe', () => {
  it('create an instance', () => {
    const pipe = new SecretPipe();
    expect(pipe).toBeTruthy();
  });
});
