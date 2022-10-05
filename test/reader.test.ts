import { Reader } from "../src";

// Number methods
describe("Reader properly reads using number methods", () => {
	// 8-bit integers
	it("reads a signed 8-bit integer", () => {
		const reader = new Reader(Buffer.from([0x01]));
		expect(reader.readInt8()).toEqual(1);
	});

	it("reads an unsigned 8-bit integer", () => {
		const reader = new Reader(Buffer.from([0x01]));
		expect(reader.readUInt8()).toEqual(1);
	});

	// 16-bit integers
	it("reads a signed 16-bit integer", () => {
		const reader = new Reader(Buffer.from([0x01, 0x00]));
		expect(reader.readInt16()).toEqual(1);
	});

	it("reads an unsigned 16-bit integer", () => {
		const reader = new Reader(Buffer.from([0x01, 0x00]));
		expect(reader.readUInt16()).toEqual(1);
	});

	// 32-bit integers
	it("reads a signed 32-bit integer", () => {
		const reader = new Reader(Buffer.from([0x01, 0x00, 0x00, 0x00]));
		expect(reader.readInt32()).toEqual(1);
	});

	it("reads an unsigned 32-bit integer", () => {
		const reader = new Reader(Buffer.from([0x01, 0x00, 0x00, 0x00]));
		expect(reader.readUInt32()).toEqual(1);
	});

	// Floats
	it("reads a 32-bit float", () => {
		const reader = new Reader(Buffer.from([0x00, 0x00, 0x80, 0x3F]));
		expect(reader.readFloat()).toEqual(1);
	});

	// Doubles
	it("reads a 64-bit double", () => {
		const reader = new Reader(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xF0, 0x3F]));
		expect(reader.readDouble()).toEqual(1);
	});
});

// String methods
describe("Reader properly reads using string methods", () => {
	it("reads a string until the default null terminator", () => {
		const reader = new Reader(Buffer.from([0x74, 0x65, 0x73, 0x74, 0x00]));
		expect(reader.readString()).toEqual("test");
	});

	it("reads a string of a fixed length", () => {
		const reader = new Reader(Buffer.from([0x74, 0x65, 0x73, 0x74]));
		expect(reader.readStringFixed(4)).toEqual("test");
	});
});

// Buffer methods
describe("Reader properly reads using buffer methods", () => {
	it("reads a buffer until the default null terminator", () => {
		const reader = new Reader(Buffer.from([0x74, 0x65, 0x73, 0x74, 0x00]));
		expect(reader.readBuffer()).toEqual(Buffer.from([0x74, 0x65, 0x73, 0x74]));
	});

	it("reads a buffer of a fixed length", () => {
		const reader = new Reader(Buffer.from([0x74, 0x65, 0x73, 0x74]));
		expect(reader.readBufferFixed(4)).toEqual(Buffer.from([0x74, 0x65, 0x73, 0x74]));
	});
});

// Other methods
describe("Reader properly reads using other methods", () => {
	it("reads a boolean", () => {
		const reader = new Reader(Buffer.from([0x01]));
		expect(reader.readBoolean()).toEqual(true);
	});

	it("skips a number of bytes", () => {
		const reader = new Reader(Buffer.from([0x74, 0x65, 0x73, 0x74]));
		reader.skip(2);
		expect(reader.readBufferFixed(2)).toEqual(Buffer.from([0x73, 0x74]));
	});	

	it("reads a fixed number of bytes", () => {
		const reader = new Reader(Buffer.from([0x74, 0x65, 0x73, 0x74]));
		expect(reader.read(2)).toEqual(Buffer.from([0x74, 0x65]));
	});
});