#include <cstdlib>

#include <event-emitter.hpp>

#include "example.hpp"

using namespace v8;
using namespace node;
using namespace std;


extern "C" {


void init(Handle<Object> target) {
	
	EventEmitter::init(target);
	Example::init(target);
	
}


NODE_MODULE(NODE_GYP_MODULE_NAME, init);


} // extern "C"
