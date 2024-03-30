# Authentication

- Use `crypto.generateKeyPairSync` to generate publicKey and privateKey.
- Use privateKey for jwt sign to generate accessToken and refreshToken.
- Use publicKey to verify these tokens, although the privateKey also can verify them. But we don't save this key to the database and it's only created once, so we use publicKey to verify those tokens.
