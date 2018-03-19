#ifndef _EXAMPLE_HPP_
#define _EXAMPLE_HPP_


#include <addon-tools.hpp>

#include "common.hpp"


class Example : public Nan::ObjectWrap {
	
public:
	
	static void init(v8::Handle<v8::Object> target);
	
	
private:
	
	Example();
	virtual ~Example();
	
	static NAN_METHOD(newCtor);
	
	static NAN_METHOD(destroy);
	
	void _destroy();
	
	
private:
	
	static Nan::Persistent<v8::FunctionTemplate> _prototype;
	static Nan::Persistent<v8::Function> _constructor;
	
	bool _isDestroyed;
	
};


#endif // _EXAMPLE_HPP_
