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
	
	Local<FunctionTemplate> ctor = Nan::New<FunctionTemplate>(newCtor);
	
	ctor->InstanceTemplate()->SetInternalFieldCount(1);
	ctor->SetClassName(JS_STR("Example"));
	
	
	// prototype
	Nan::SetPrototypeMethod(ctor, "destroy", destroy);
	
	extend(ctor);
	
	
	Local<ObjectTemplate> proto = ctor->PrototypeTemplate();
	// ACCESSOR_RW(proto, prop);
	
	
	
	_constructor.Reset(Nan::GetFunction(ctor).ToLocalChecked());
	Nan::Set(target, JS_STR("Example"), Nan::GetFunction(ctor).ToLocalChecked());
	
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
