#ifndef _EVENT_EMITTER_
#define _EVENT_EMITTER_


#include <addon-tools.hpp>

#include <map>
#include <vector>


#define THIS_VIEW                                                             \
	EventEmitter *emitter = ObjectWrap::Unwrap<EventEmitter>(info.This());


class EventEmitter : public Nan::ObjectWrap {
	
	typedef Nan::CopyablePersistentTraits<v8::Function>::CopyablePersistent FN_TYPE;
	typedef std::vector<FN_TYPE> VEC_TYPE;
	typedef std::map<std::string, VEC_TYPE> MAP_TYPE;
	typedef VEC_TYPE::iterator IT_TYPE;
	
public:
	
	Emitter () {}
	~Emitter () {}
	
	
	init(v8::Local<v8::FunctionTemplate> &ctor, v8::Local<v8::ObjectTemplate> &proto) {
		
		v8::Local<v8::Function> ctorFunc = Nan::GetFunction(ctor).ToLocalChecked();
		
		
		// -------- static
		
		Nan::SetMethod(ctorFunc, "listenerCount", jsStaticListenerCount);
		ACCESSOR_RW(ctorFunc, defaultMaxListeners);
		
		
		// -------- dynamic
		
		Nan::SetPrototypeMethod(ctor, "listenerCount", jsListenerCount);
		Nan::SetPrototypeMethod(ctor, "addListener", jsAddListener);
		Nan::SetPrototypeMethod(ctor, "eventNames", jsEventNames);
		Nan::SetPrototypeMethod(ctor, "getMaxListeners", jsGetMaxListeners);
		Nan::SetPrototypeMethod(ctor, "listeners", jsListeners);
		Nan::SetPrototypeMethod(ctor, "on", jsOn);
		Nan::SetPrototypeMethod(ctor, "once", jsOnce);
		Nan::SetPrototypeMethod(ctor, "prependListener", jsPrependListener);
		Nan::SetPrototypeMethod(ctor, "prependOnceListener", jsPrependOnceListener);
		Nan::SetPrototypeMethod(ctor, "removeAllListeners", jsRemoveAllListeners);
		Nan::SetPrototypeMethod(ctor, "removeListener", jsRemoveListener);
		Nan::SetPrototypeMethod(ctor, "setMaxListeners", jsSetMaxListeners);
		Nan::SetPrototypeMethod(ctor, "rawListeners", jsRawListeners);
		
		// ACCESSOR_RW(proto, type);
		
	}
	
	
	void emit(const std::string &name, int argc, Local<Value> argv[]) {
		
		const VEC_TYPE &list = _listeners[name];
		
		if (list.empty()) {
			return;
		}
		
		for (IT_TYPE it = list.begin(); it != list.end(); ++it) {
			
			Nan::Callback callback(Nan::New(*it));
			
			if ( ! callback.IsEmpty() ) {
				callback.Call(argc, argv);
			}
			
		}
		
	}
	
	
	
	
	
	NAN_METHOD(jsStaticListenerCount) {
		
		Emitter *emitter = ObjectWrap::Unwrap<Emitter>(info[0]);
		REQ_UTF8_ARG(1, name);
		
		const VEC_TYPE &list = emitter->_listeners[*name];
		
		Local<Array> jsListeners = Nan::New<Array>(list.size());
		
		if (list.empty()) {
			RET_VALUE(jsListeners);
			return;
		}
		
		for (IT_TYPE it = list.begin(), int i = 0; it != list.end(); ++it) {
			
			jsListeners->Set(JS_INT(j), Nan::New(*it));
		}
		
		RET_VALUE(jsListeners);
		
	}
	
	
	
	NAN_METHOD(jsStaticListenerCount) {
		
		Emitter *emitter = ObjectWrap::Unwrap<Emitter>(info[0]);
		REQ_UTF8_ARG(1, name);
		
		const VEC_TYPE &list = emitter->_listeners[*name];
		
		Local<Array> jsListeners = Nan::New<Array>(list.size());
		
		if (list.empty()) {
			RET_VALUE(jsListeners);
			return;
		}
		
		for (IT_TYPE it = list.begin(), int i = 0; it != list.end(); ++it) {
			
			jsListeners->Set(JS_INT(j), Nan::New(*it));
		}
		
		RET_VALUE(jsListeners);
		
	}
	
	
	NAN_METHOD(jsListenerCount) { THIS_EMITTER;
		
		REQ_UTF8_ARG(0, name);
		
		const VEC_TYPE &list = emitter->_listeners[*name];
		
		RET_VALUE(JS_INT(list.size()));
		
	}
	
	
	NAN_METHOD(jsAddListener) { THIS_EMITTER;
		
		REQ_UTF8_ARG(0, name);
		REQ_FUN_ARG(1, cb);
		
		Nan::Persistent<v8::Function> persistentCb;
		persistentCb.Reset(cb);
		
		emitter->_listeners[std::string(*name)].push_back(persistentCb);
		
	}
	
	
	NAN_METHOD(jsOn) { THIS_EMITTER;
		
		REQ_UTF8_ARG(0, name);
		REQ_FUN_ARG(1, cb);
		
		Nan::Persistent<v8::Function> persistentCb;
		persistentCb.Reset(cb);
		
		emitter->_listeners[std::string(*name)].push_back(persistentCb);
		
	}
	
	
	
private:
	
	MAP_TYPE _listeners;
	
};


#endif // _EVENT_EMITTER_
