#include <cstdlib>
#include <iostream>

#include "example.hpp"


using namespace v8;
using namespace node;
using namespace std;


// ------ Aux macros

#define THIS_EXAMPLE                                                          \
	Example *example = ObjectWrap::Unwrap<Example>(info.This());

#define THIS_CHECK                                                            \
	if (example->_isDestroyed) return;


// ------ Constructor and Destructor

Example::Example() : EventEmitter() {
	
	_isDestroyed = false;
	
}


Example::~Example() {
	
	_destroy();
	
}


NAN_METHOD(Example::cppOn) { THIS_EXAMPLE; THIS_CHECK;
	
	REQ_STR_ARG(0, name);
	REQ_FUN_ARG(1, cb);
	
	example->on(*name, cb);
	
}


// ------ System methods and props for ObjectWrap

V8_STORE_FT Example::_protoExample;
V8_STORE_FUNC Example::_ctorExample;


void Example::init(V8_VAR_OBJ target) {
	
	V8_VAR_FT proto = Nan::New<FunctionTemplate>(newCtor);
	
	// class AudioBufferSourceNode inherits AudioScheduledSourceNode
	V8_VAR_FT parent = Nan::New(EventEmitter::_protoEventEmitter);
	proto->Inherit(parent);
	
	proto->InstanceTemplate()->SetInternalFieldCount(1);
	proto->SetClassName(JS_STR("Example"));
	
	// -------- dynamic
	Nan::SetPrototypeMethod(proto, "destroy", destroy);
	Nan::SetPrototypeMethod(proto, "cppOn", cppOn);
	
	// -------- static
	V8_VAR_FUNC ctor = Nan::GetFunction(proto).ToLocalChecked();
	
	_protoExample.Reset(proto);
	_ctorExample.Reset(ctor);
	
	Nan::Set(target, JS_STR("Example"), ctor);
	
}


NAN_METHOD(Example::newCtor) {
	
	CTOR_CHECK("EventEmitter");
	
	Example *example = new Example();
	example->Wrap(info.This());
	
	RET_VALUE(info.This());
	
}


void Example::_destroy() { DES_CHECK;
	
	_isDestroyed = true;
	
	EventEmitter::_destroy();
	
}


NAN_METHOD(Example::destroy) { THIS_EXAMPLE; THIS_CHECK;
	
	example->emit("destroy");
	
	example->_destroy();
	
}
