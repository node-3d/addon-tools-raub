#include <cstdlib>

#include <event-emitter.hpp>

#include "example.hpp"

using namespace v8;
using namespace node;
using namespace std;


extern "C" {


void init(V8_VAR_OBJ target) {
	
	EventEmitter::init(target);
	Example::init(target);
	
}


NODE_MODULE(example, init);


} // extern "C"
