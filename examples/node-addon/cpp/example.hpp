#ifndef _EXAMPLE_HPP_
#define _EXAMPLE_HPP_


#include <event-emitter.hpp>


class Example : public EventEmitter {
	
public:
	
	static void init(v8::Handle<v8::Object> target);
	
	
protected:
	
	Example();
	~Example();
	void _destroy();
	
	
private:
	
	static NAN_METHOD(newCtor);
	
	static NAN_METHOD(destroy);
	
	
private:
	
	static Nan::Persistent<v8::Function> _constructor;
	
	bool _isDestroyed;
	
};


#endif // _EXAMPLE_HPP_
