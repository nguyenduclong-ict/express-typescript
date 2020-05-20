import bcrypt from 'bcrypt';
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

function hash(text: string) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(text, salt);
}

function compare(plain: string, encrypted: string) {
  return bcrypt.compareSync(plain, encrypted);
}

export default { hash, compare };
