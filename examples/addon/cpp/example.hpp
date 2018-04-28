#ifndef _EXAMPLE_HPP_
#define _EXAMPLE_HPP_


#include <event-emitter.hpp>


class Example : public EventEmitter {
	
public:
	
	~Example();
	
	static void init(V8_VAR_OBJ target);
	
	
protected:
	
	Example();
	
	void _destroy();
	
	
private:
	
	static NAN_METHOD(newCtor);
	
	static NAN_METHOD(destroy);
	
	
private:
	
	static V8_STORE_FT _protoExample;
	static V8_STORE_FUNC _ctorExample;
	
	bool _isDestroyed;
	
};


#endif // _EXAMPLE_HPP_
