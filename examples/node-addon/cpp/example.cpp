#include <cstdlib>
#include <iostream>

#include <event-emitter.hpp>

#include "example.hpp"

using namespace v8;
using namespace node;
using namespace std;

#define THIS_EXAMPLE                                                          \
	Example *example = ObjectWrap::Unwrap<Example>(info.This());

#define THIS_EVENT_EMITTER                                                    \
	EventEmitter *eventEmitter = ObjectWrap::Unwrap<EventEmitter>(info.This());

#define THIS_CHECK                                                            \
	if (example->_isDestroyed) return;


Nan::Persistent<v8::FunctionTemplate> Example::_prototype;
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
	
	
	_prototype.Reset(proto);
	_constructor.Reset(ctor);
	
	Nan::Set(target, JS_STR("Example"), ctor);
	
}


NAN_METHOD(Example::newCtor) {
	
	std::cout << "Example() 1" << std::endl;
	v8::Local<v8::Function> superCtor = Nan::New(EventEmitter::_constructor);
	superCtor->Call(info.This(), 0, nullptr);
	std::cout << "Example() 2" << std::endl;
	Example *example = new Example();
	example->Wrap(info.This());
	std::cout << "Example() 3 @" << example << std::endl;
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
	
}


NAN_METHOD(Example::destroy) { THIS_EXAMPLE; THIS_CHECK; THIS_EVENT_EMITTER;
	
	eventEmitter->_destroy();
	example->_destroy();
	
}
