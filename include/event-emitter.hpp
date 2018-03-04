#ifndef _EVENT_EMITTER_
#define _EVENT_EMITTER_


#include <addon-tools.hpp>

#include <map>
#include <deque>


#define THIS_EMITTER                                                          \
	EventEmitter *emitter = ObjectWrap::Unwrap<EventEmitter>(info.This());


class EventEmitter : public Nan::ObjectWrap {
	
	typedef Nan::CopyablePersistentTraits<v8::Function>::CopyablePersistent FN_TYPE;
	typedef std::deque<FN_TYPE> VEC_TYPE;
	typedef std::map<std::string, VEC_TYPE> MAP_TYPE;
	typedef std::map<int, FN_TYPE> FNMAP_TYPE;
	typedef VEC_TYPE::iterator IT_TYPE;
	typedef MAP_TYPE::iterator MAP_IT_TYPE;
	typedef FNMAP_TYPE::iterator FNMAP_IT_TYPE;
	
public:
	
	EventEmitter () {
		_maxListeners = _defaultMaxListeners;
		_freeId = 0;
	}
	~EventEmitter () {}
	
	
	static void extend(v8::Local<v8::FunctionTemplate> &ctor, v8::Local<v8::ObjectTemplate> &proto) {
		
		v8::Local<v8::Function> ctorFunc = Nan::GetFunction(ctor).ToLocalChecked();
		v8::Local<v8::Object> ctorObj = ctorFunc;
		
		
		// -------- static
		
		Nan::SetMethod(ctorFunc, "listenerCount", jsStaticListenerCount);
		ACCESSOR_RW(ctorObj, defaultMaxListeners);
		
		
		// -------- dynamic
		
		Nan::SetPrototypeMethod(ctor, "listenerCount", jsListenerCount);
		Nan::SetPrototypeMethod(ctor, "addListener", jsAddListener);
		Nan::SetPrototypeMethod(ctor, "emit", jsEmit);
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
	
	
	void emit(const std::string &name, int argc = 0, v8::Local<v8::Value> *argv = NULL) {
		
		VEC_TYPE &list = _listeners[name];
		
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
	
	
	// Deprecated method
	static NAN_METHOD(jsStaticListenerCount) {
		
		// EventEmitter *emitter = ObjectWrap::Unwrap<EventEmitter>(info[0]);
		// REQ_UTF8_ARG(1, name);
		
		// const VEC_TYPE &list = emitter->_listeners[*name];
		
		// RET_VALUE(JS_NUM(list.size()));
		
	}
	
	
	static NAN_SETTER(defaultMaxListenersSetter) { THIS_EMITTER; SETTER_INT32_ARG;
		
		EventEmitter::_defaultMaxListeners = v;
		
	}
	
	static NAN_GETTER(defaultMaxListenersGetter) { THIS_EMITTER;
		
		RET_VALUE(JS_INT(EventEmitter::_defaultMaxListeners));
		
	}
	
	
	static NAN_METHOD(jsAddListener) { THIS_EMITTER;
		
		REQ_UTF8_ARG(0, name);
		REQ_FUN_ARG(1, cb);
		
		Nan::Persistent<v8::Function> persistentCb;
		persistentCb.Reset(cb);
		
		emitter->_listeners[std::string(*name)].push_back(persistentCb);
		
	}
	
	
	static NAN_METHOD(jsEmit) { THIS_EMITTER;
		
		REQ_UTF8_ARG(0, name);
		
		emitter->emit(*name, info.Length() - 1, &info[1]);
		
	}
	
	
	static NAN_METHOD(jsEventNames) { THIS_EMITTER;
		
		v8::Local<v8::Array> jsNames = Nan::New<v8::Array>(emitter->_listeners.size());
		
		if (emitter->_listeners.empty()) {
			RET_VALUE(jsNames);
			return;
		}
		
		int i = 0;
		for (MAP_IT_TYPE it = emitter->_listeners.begin(); it != emitter->_listeners.end(); ++it, i++) {
			
			jsNames->Set(JS_INT(i), JS_STR(it->first));
			
		}
		
		RET_VALUE(jsNames);
		
	}
	
	
	static NAN_METHOD(jsGetMaxListeners) { THIS_EMITTER;
		
		RET_VALUE(JS_INT(emitter->_maxListeners));
		
	}
	
	
	static NAN_METHOD(jsListenerCount) { THIS_EMITTER;
		
		REQ_UTF8_ARG(0, name);
		
		const VEC_TYPE &list = emitter->_listeners[*name];
		
		RET_VALUE(JS_INT(static_cast<int>(list.size())));
		
	}
	
	
	static NAN_METHOD(jsListeners) { THIS_EMITTER;
		
		REQ_UTF8_ARG(0, name);
		
		VEC_TYPE &list = emitter->_listeners[*name];
		
		v8::Local<v8::Array> jsListeners = Nan::New<v8::Array>(list.size());
		
		if (list.empty()) {
			RET_VALUE(jsListeners);
			return;
		}
		
		int i = 0;
		for (IT_TYPE it = list.begin(); it != list.end(); ++it, i++) {
			
			jsListeners->Set(JS_INT(i), Nan::New(*it));
			
		}
		
		RET_VALUE(jsListeners);
		
	}
	
	
	static inline void _addListener(
		const Nan::FunctionCallbackInfo<v8::Value> &info,
		const std::string &name,
		Nan::Persistent<v8::Function> &cb,
		bool isFront
	) { THIS_EMITTER;
		
		if (isFront) {
			emitter->_listeners[name].push_front(cb);
			emitter->_raw[name].push_front(cb);
		} else {
			emitter->_listeners[name].push_back(cb);
			emitter->_raw[name].push_back(cb);
		}
		
	}
	
	
	static inline void _wrapListener(
		const Nan::FunctionCallbackInfo<v8::Value> &info,
		bool isFront = false
	) {
		
		REQ_UTF8_ARG(0, name);
		REQ_FUN_ARG(1, cb);
		
		Nan::Persistent<v8::Function> persistentCb;
		persistentCb.Reset(cb);
		
		_addListener(info, *name, persistentCb, isFront);
		
	}
	
	
	static inline void _addOnceListener(
		const Nan::FunctionCallbackInfo<v8::Value> &info,
		const std::string &name,
		Nan::Persistent<v8::Function> &raw,
		Nan::Persistent<v8::Function> &cb,
		bool isFront
	) { THIS_EMITTER;
		
		if (isFront) {
			emitter->_listeners[name].push_front(cb);
			emitter->_raw[name].push_front(raw);
		} else {
			emitter->_listeners[name].push_back(cb);
			emitter->_raw[name].push_back(raw);
		}
		
		int nextId = emitter->_freeId++;
		emitter->_wrappedIds[nextId] = cb;
		emitter->_rawIds[nextId] = raw;
		
	}
	
	
	static inline void _wrapOnceListener(
		const Nan::FunctionCallbackInfo<v8::Value> &info,
		bool isFront = false
	) {
		
		REQ_UTF8_ARG(0, name);
		REQ_FUN_ARG(1, raw);
		
		v8::Local<v8::String> code = JS_STR(
			"((emitter, cb) => (...args) => {\n\
				cb(...args);\n\
				emitter.removeListener(cb);\n\
			})"
		);
		
		v8::Local<v8::Function> decor = v8::Local<v8::Function>::Cast(v8::Script::Compile(code)->Run());
		Nan::Callback decorCb(decor);
		v8::Local<v8::Value> argv[] = { info.This(), raw };
		v8::Local<v8::Function> wrap = v8::Local<v8::Function>::Cast(decorCb.Call(2, argv));
		
		Nan::Persistent<v8::Function> persistentWrap;
		persistentWrap.Reset(wrap);
		
		Nan::Persistent<v8::Function> persistentRaw;
		persistentRaw.Reset(raw);
		
		_addOnceListener(info, *name, persistentRaw, persistentWrap, isFront);
		
	}
	
	
	static NAN_METHOD(jsOn) { _wrapListener(info); }
	
	static NAN_METHOD(jsOnce) { _wrapOnceListener(info); }
	
	static NAN_METHOD(jsPrependListener) { _wrapListener(info, true); }
	
	static NAN_METHOD(jsPrependOnceListener) { _wrapOnceListener(info, true); }
	
	
	static NAN_METHOD(jsRemoveAllListeners) { THIS_EMITTER;
		
		if (info.Length() > 0 && info[0]->IsString()) {
			
			emitter->_listeners.clear();
			emitter->_raw.clear();
			emitter->_wrappedIds.clear();
			emitter->_rawIds.clear();
			
			return;
			
		}
		
		REQ_UTF8_ARG(0, n);
		
		std::string name = std::string(*n);
		VEC_TYPE &list = emitter->_raw[name];
		
		if (list.empty()) {
			return;
		}
		
		if (emitter->_rawIds.size()) {
			
			std::vector<int> removes;
			
			for (IT_TYPE it = list.begin(); it != list.end(); ++it) {
				
				FN_TYPE fn = *it;
				
				for (FNMAP_IT_TYPE itRaw = emitter->_rawIds.begin(); itRaw != emitter->_rawIds.end(); ++itRaw) {
					// emitter->_wrappedIds.erase(*it);
					if (fn == itRaw->second) {
						removes.push_back(itRaw->first);
					}
				}
				
			}
			
			if (removes.size()) {
				for (std::vector<int>::const_iterator it = removes.begin(); it != removes.end(); ++it) {
					
					emitter->_wrappedIds.erase(*it);
					emitter->_rawIds.erase(*it);
					
				}
			}
			
		}
		
		
		emitter->_listeners[name].clear();
		emitter->_raw[name].clear();
		
	}
	
	
	static NAN_METHOD(jsRemoveListener) { THIS_EMITTER;
		
		REQ_UTF8_ARG(0, n);
		REQ_FUN_ARG(1, raw);
		
		Nan::Persistent<v8::Function> persistentRaw;
		persistentRaw.Reset(raw);
		
		std::string name = std::string(*n);
		
		
		VEC_TYPE &rawList = emitter->_raw[name];
		
		if (rawList.empty()) {
			return;
		}
		
		for (IT_TYPE it = rawList.begin(); it != rawList.end(); ++it) {
			
			if (*it == persistentRaw) {
				rawList.erase(it);
				break;
			}
			
		}
		
		
		VEC_TYPE &wrapList = emitter->_listeners[name];
		
		if (emitter->_wrappedIds.size() == 0) {
			
			for (IT_TYPE it = wrapList.begin(); it != wrapList.end(); ++it) {
				
				if (*it == persistentRaw) {
					wrapList.erase(it);
					break;
				}
				
			}
			
			return;
			
		}
		
		
		for (FNMAP_IT_TYPE itRaw = emitter->_rawIds.begin(); itRaw != emitter->_rawIds.end(); ++itRaw) {
			
			if (persistentRaw == itRaw->second) {
				
				FN_TYPE fn = emitter->_wrappedIds[itRaw->first];
				
				for (IT_TYPE it = wrapList.begin(); it != wrapList.end(); ++it) {
					
					if (*it == fn) {
						wrapList.erase(it);
						break;
					}
					
				}
				
				emitter->_wrappedIds.erase(itRaw->first);
				emitter->_rawIds.erase(itRaw->first);
				
				break;
				
			}
			
		}
		
	}
	
	
	static NAN_METHOD(jsSetMaxListeners) { THIS_EMITTER;
		
		REQ_INT32_ARG(0, value);
		
		emitter->_maxListeners = value;
		
	}
	
	
	static NAN_METHOD(jsRawListeners) { THIS_EMITTER;
		
		REQ_UTF8_ARG(0, name);
		
		VEC_TYPE &list = emitter->_raw[*name];
		
		v8::Local<v8::Array> jsListeners = Nan::New<v8::Array>(list.size());
		
		if (list.empty()) {
			RET_VALUE(jsListeners);
			return;
		}
		
		int i = 0;
		for (IT_TYPE it = list.begin(); it != list.end(); ++it, i++) {
			
			jsListeners->Set(JS_INT(i), Nan::New(*it));
			
		}
		
		RET_VALUE(jsListeners);
		
	}
	
	
private:
	
	static int _defaultMaxListeners;
	
	
private:
	
	int _maxListeners;
	
	MAP_TYPE _listeners;
	MAP_TYPE _raw;
	
	int _freeId;
	FNMAP_TYPE _wrappedIds;
	FNMAP_TYPE _rawIds;
	
};


#endif // _EVENT_EMITTER_
