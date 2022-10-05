import ByteOrder from './enums/ByteOrder';
/**
 * Reader
 * 
 * @param {Buffer} buffer The buffer to read from.
 * @param {string} encoding The encoding to use.
 * @param {string} delimiter The delimiter to use.
 * @param {string} byteOrder The byte order to use.
 */
export default class Reader {
	buffer: Buffer;
	encoding: BufferEncoding = 'utf8';
	delimiter: string = '\0';
	byteOrder: ByteOrder = ByteOrder.LittleEndian;

	private index: number = 0;

	constructor(buffer: Buffer, encoding: BufferEncoding = 'utf8', delimiter: string = '\0', byteOrder: ByteOrder = ByteOrder.LittleEndian) {
		this.buffer = buffer;
		this.encoding = encoding;
		this.delimiter = delimiter;
		this.byteOrder = byteOrder;
	}

	//#region Number methods

	/**
	 * Read a signed 8-bit integer.
	 * 
	 * @returns {number}
	 */
	readInt8(): number {
		const value = this.buffer.readInt8(this.index);
		this.index += 1;
		return value;
	}

	/**
	 * Read an unsigned 8-bit integer.
	 * 
	 * @returns {number}
	 */
	readUInt8(): number {
		const value = this.buffer.readUInt8(this.index);
		this.index += 1;
		return value;
	}

	/**
	 * Read a signed 16-bit integer.
	 * 
	 * @returns {number}
	 */
	readInt16(): number {
		let value = 0;

		if (this.byteOrder === ByteOrder.LittleEndian) {
			value = this.buffer.readInt16LE(this.index);
		} else {
			value = this.buffer.readInt16BE(this.index);
		}

		this.index += 2;

		return value;
	}

	/**
	 * Read an unsigned 16-bit integer.
	 * 
	 * @returns {number}
	 */
	readUInt16(): number {
		let value = 0;

		if (this.byteOrder === ByteOrder.LittleEndian) {
			value = this.buffer.readUInt16LE(this.index);
		} else {
			value = this.buffer.readUInt16BE(this.index);
		}

		this.index += 2;

		return value;
	}

	/**
	 * Read a signed 32-bit integer.
	 * 
	 * @returns {number}
	 */
	readInt32(): number {
		let value = 0;

		if (this.byteOrder === ByteOrder.LittleEndian) {
			value = this.buffer.readInt32LE(this.index);
		} else {
			value = this.buffer.readInt32BE(this.index);
		}

		this.index += 4;

		return value;
	}

	/**
	 * Read an unsigned 32-bit integer.
	 * 
	 * @returns {number}
	 */
	readUInt32(): number {
		let value = 0;

		if (this.byteOrder === ByteOrder.LittleEndian) {
			value = this.buffer.readUInt32LE(this.index);
		} else {
			value = this.buffer.readUInt32BE(this.index);
		}

		this.index += 4;

		return value;
	}

	/**
	 * Read a 32-bit float.
	 * 
	 * @returns {number}
	 */
	readFloat(): number {
		let value = 0;

		if (this.byteOrder === ByteOrder.LittleEndian) {
			value = this.buffer.readFloatLE(this.index);
		} else {
			value = this.buffer.readFloatBE(this.index);
		}

		this.index += 4;

		return value;
	}

	/**
	 * Read a 64-bit float.
	 * 
	 * @returns {number}
	 */
	readDouble(): number {
		let value = 0;

		if (this.byteOrder === ByteOrder.LittleEndian) {
			value = this.buffer.readDoubleLE(this.index);
		} else {
			value = this.buffer.readDoubleBE(this.index);
		}

		this.index += 8;

		return value;
	}

	//#endregion

	//#region String methods

	/**
	 * Read a string until the delimiter is reached.
	 * 
	 * @returns {string}
	 * @throws {Error} If the delimiter is not found.
	 */
	readString(): string {
		const index = this.buffer.indexOf(this.delimiter, this.index);

		if (index === -1) {
			throw new Error('Delimiter not found.');
		}

		const value = this.buffer.toString(this.encoding, this.index, index);
		this.index = index + 1;

		return value;
	}

	/**
	 * Read a string with a fixed length.
	 * 
	 * @param {number} length The length of the string.
	 * @returns {string}
	 */
	readStringFixed(length: number): string {
		const value = this.buffer.toString(this.encoding, this.index, this.index + length);
		this.index += length;

		return value;
	}

	//#endregion

	//#region Buffer methods

	/**
	 * Read a buffer until the delimiter is reached.
	 * 
	 * @returns {Buffer}
	 * @throws {Error} If the delimiter is not found.
	 */
	readBuffer(): Buffer {
		const index = this.buffer.indexOf(this.delimiter, this.index);

		if (index === -1) {
			throw new Error('Delimiter not found.');
		}

		const value = this.buffer.subarray(this.index, index);
		this.index = index + 1;

		return value;
	}

	/**
	 * Read a buffer with a fixed length.
	 * 
	 * @param {number} length The length of the buffer.
	 * @returns {Buffer}
	 */
	readBufferFixed(length: number): Buffer {
		const value = this.buffer.subarray(this.index, this.index + length);
		this.index += length;

		return value;
	}

	//#endregion

	//#region Other methods

	/**
	 * Read a boolean.
	 * 
	 * @returns {boolean}
	 */
	readBoolean(): boolean {
		return this.readUInt8() === 1;
	}

	/**
	 * Skip a number of bytes.
	 * 
	 * @param {number} count The number of bytes to skip.
	 */
	skip(count: number): void {
		this.index += count;
	}

	/**
	 * Read a number of bytes.
	 * 
	 * @param {number} count The number of bytes to read.
	 * @returns {Buffer}
	 */
	read(count: number): Buffer {
		const value = this.buffer.subarray(this.index, this.index + count);
		this.index += count;

		return value;
	}
}