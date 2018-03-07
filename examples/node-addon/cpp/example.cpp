#include <cstdlib>
#include <iostream>

#include "example.hpp"

using namespace v8;
using namespace node;
using namespace std;

#define THIS_EXAMPLE                                                          \
	Example *example = ObjectWrap::Unwrap<Example>(info.This());

#define THIS_CHECK                                                            \
	if (example->_isDestroyed) return;


Nan::Persistent<v8::Function> Example::_constructor;


void Example::init(Handle<Object> target) {
	
	Local<FunctionTemplate> proto = Nan::New<FunctionTemplate>(newCtor);
	
	proto->InstanceTemplate()->SetInternalFieldCount(1);
	proto->SetClassName(JS_STR("Example"));
	
	
	// -------- dynamic
	
	// Add EventEmitter methods
	extendPrototype(proto);
	
	Nan::SetPrototypeMethod(proto, "destroy", destroy);
	
	
	// -------- static
	
	Local<Function> ctor = Nan::GetFunction(proto).ToLocalChecked();
	
	extendConstructor(ctor);
	
	
	_constructor.Reset(ctor);
	Nan::Set(target, JS_STR("Example"), ctor);
	
}


NAN_METHOD(Example::newCtor) {
	
	CTOR_CHECK("Example");
	
	Example *example = new Example();
	example->Wrap(info.This());
	
	RET_VALUE(info.This());
	
}


Example::Example() {
	
	_isDestroyed = false;
	
}


Example::~Example() {
	
	_destroy();
	
}


void Example::_destroy() { DES_CHECK;
	
	_isDestroyed = true;
	
	emit("destroy");
	
}


NAN_METHOD(Example::destroy) { THIS_EXAMPLE; THIS_CHECK;
	
	example->_destroy();
	
}
