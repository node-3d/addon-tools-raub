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
	
	// class Example extends EventEmitter
	Local<FunctionTemplate> parent = Nan::New(EventEmitter::_prototype);
	proto->Inherit(parent);
	
	proto->InstanceTemplate()->SetInternalFieldCount(1);
	proto->SetClassName(JS_STR("Example"));
	
	// -------- dynamic
	Nan::SetPrototypeMethod(proto, "destroy", destroy);
	
	// -------- static
	Local<Function> ctor = Nan::GetFunction(proto).ToLocalChecked();
	
	_constructor.Reset(ctor);
	
	Nan::Set(target, JS_STR("Example"), ctor);
	
}


NAN_METHOD(Example::newCtor) {
	
	CTOR_CHECK("EventEmitter");
	
	Example *example = new Example();
	example->Wrap(info.This());
	
	RET_VALUE(info.This());
	
}


Example::Example() : EventEmitter() {
	
	_isDestroyed = false;
	
}


Example::~Example() {
	
	_destroy();
	
}


void Example::_destroy() { DES_CHECK;
	
	_isDestroyed = true;
	
	EventEmitter::_destroy();
	
}


NAN_METHOD(Example::destroy) { THIS_EXAMPLE; THIS_CHECK;
	
	example->_destroy();
	
}
