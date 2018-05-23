#include <cstdlib>

#include <event-emitter.hpp>

#include "example.hpp"


extern "C" {


void init(V8_VAR_OBJ target) {
	
	EventEmitter::init(target);
	
	Example::init(target);
	
}


NODE_MODULE(example, init);


} // extern "C"
