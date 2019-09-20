#ifndef _ADDON_TOOLS_HPP_
#define _ADDON_TOOLS_HPP_

#define NODE_ADDON_API_DISABLE_DEPRECATED
#include <napi.h>


#ifdef _WIN32
	#define	strcasestr(s, t) strstr(strupr(s), strupr(t))
#endif


#define NAPI_ENV Napi::Env env = info.Env();
#define NAPI_HS Napi::HandleScope scope(env);


#define JS_STR(VAL) Napi::String::New(env, VAL)
#define JS_NUM(VAL) Napi::Number::New(env, static_cast<double>(VAL))
#define JS_EXT(VAL) Napi::External<void>::New(env, reinterpret_cast<void*>(VAL))
#define JS_BOOL(VAL) Napi::Boolean::New(env, static_cast<bool>(VAL))
#define JS_FUN(VAL) Napi::Function::New(env, VAL)
#define JS_OBJ(VAL) Napi::Object::New(env, VAL)


#define RET_VALUE(VAL) return VAL;
#define RET_UNDEFINED RET_VALUE(env.Undefined())
#define RET_NULL RET_VALUE(env.Null())
#define RET_STR(VAL) RET_VALUE(JS_STR(VAL))
#define RET_NUM(VAL) RET_VALUE(JS_NUM(VAL))
#define RET_EXT(VAL) RET_VALUE(JS_EXT(VAL))
#define RET_BOOL(VAL) RET_VALUE(JS_BOOL(VAL))
#define RET_FUN(VAL) RET_VALUE(JS_FUN(VAL))
#define RET_OBJ(VAL) RET_VALUE(JS_OBJ(VAL))


#define JS_THROW(VAL)                                                         \
	Napi::Error::New(env, VAL).ThrowAsJavaScriptException();


#define REQ_ARGS(N)                                                           \
	if (info.Length() < (N)) {                                                \
		JS_THROW("Expected at least " #N " arguments");                       \
	}


#define IS_EMPTY(VAL) (VAL.IsNull() || VAL.IsUndefined())
#define IS_ARG_EMPTY(I) IS_EMPTY(info[I])


#define CHECK_REQ_ARG(I, C, T)                                                \
	if (info.Length() <= (I) || ! info[I].C) {                                \
		JS_THROW("Argument " #I " must be of type `" T "`");                  \
	}

#define CHECK_LET_ARG(I, C, T)                                                \
	if ( ! (IS_ARG_EMPTY(I) || info[I].C) ) {                                 \
		JS_THROW(                                                             \
			"Argument " #I                                                    \
			" must be of type `" T                                            \
			"` or be `null`/`undefined`"                                      \
		);                                                                    \
	}


#define REQ_STR_ARG(I, VAR)                                                   \
	CHECK_REQ_ARG(I, IsString(), "String");                                   \
	std::string VAR = info[I].ToString().Utf8Value();

#define USE_STR_ARG(I, VAR, DEF)                                              \
	CHECK_LET_ARG(I, IsString(), "String");                                   \
	std::string VAR = IS_ARG_EMPTY(I) ? (DEF) : info[I].ToString().Utf8Value();

#define LET_STR_ARG(I, VAR) USE_STR_ARG(I, VAR, "")


#define REQ_INT32_ARG(I, VAR)                                                 \
	CHECK_REQ_ARG(I, IsNumber(), "Int32");                                    \
	int VAR = info[I].ToNumber().Int32Value();

#define USE_INT32_ARG(I, VAR, DEF)                                            \
	CHECK_LET_ARG(I, IsNumber(), "Int32");                                    \
	int VAR = IS_ARG_EMPTY(I) ? (DEF) : info[I].ToNumber().Int32Value();

#define LET_INT32_ARG(I, VAR) USE_INT32_ARG(I, VAR, 0)

#define REQ_INT_ARG(I, VAR) REQ_INT32_ARG(I, VAR)
#define USE_INT_ARG(I, VAR, DEF) USE_INT32_ARG(I, VAR, DEF)
#define LET_INT_ARG(I, VAR) LET_INT32_ARG(I, VAR)


#define REQ_UINT32_ARG(I, VAR)                                                \
	CHECK_REQ_ARG(I, IsNumber(), "Uint32");                                   \
	unsigned int VAR = info[I].ToNumber().Uint32Value();

#define USE_UINT32_ARG(I, VAR, DEF)                                           \
	CHECK_LET_ARG(I, IsNumber(), "Uint32");                                   \
	unsigned int VAR = IS_ARG_EMPTY(I)                                        \
		? (DEF)                                                               \
		: info[I].ToNumber().Uint32Value();

#define LET_UINT32_ARG(I, VAR) USE_UINT32_ARG(I, VAR, 0)

#define REQ_UINT_ARG(I, VAR) REQ_UINT_ARG(I, VAR)
#define USE_UINT_ARG(I, VAR, DEF) USE_UINT32_ARG(I, VAR, DEF)
#define LET_UINT_ARG(I, VAR) LET_UINT32_ARG(I, VAR)


#define REQ_BOOL_ARG(I, VAR)                                                  \
	CHECK_REQ_ARG(I, IsBoolean(), "Bool");                                    \
	bool VAR = info[I].ToBoolean().Value();

#define USE_BOOL_ARG(I, VAR, DEF)                                             \
	CHECK_LET_ARG(I, IsBoolean(), "Bool");                                    \
	bool VAR = IS_ARG_EMPTY(I) ? (DEF) : info[I].ToBoolean().Value();

#define LET_BOOL_ARG(I, VAR) USE_BOOL_ARG(I, VAR, false)


#define REQ_OFFS_ARG(I, VAR)                                                  \
	CHECK_REQ_ARG(I, IsNumber(), "Number");                                   \
	size_t VAR = static_cast<size_t>(info[I].ToNumber().DoubleValue());

#define USE_OFFS_ARG(I, VAR, DEF)                                             \
	CHECK_LET_ARG(I, IsNumber(), "Number");                                   \
	size_t VAR = IS_ARG_EMPTY(I)                                              \
	? (DEF)                                                                   \
	: static_cast<size_t>(info[I].ToNumber().DoubleValue());

#define LET_OFFS_ARG(I, VAR) USE_OFFS_ARG(I, VAR, 0)


#define REQ_DOUBLE_ARG(I, VAR)                                                \
	CHECK_REQ_ARG(I, IsNumber(), "Number");                                   \
	double VAR = info[I].ToNumber().DoubleValue();

#define USE_DOUBLE_ARG(I, VAR, DEF)                                           \
	CHECK_LET_ARG(I, IsNumber(), "Number");                                   \
	double VAR = IS_ARG_EMPTY(I) ? (DEF) : info[I].ToNumber().DoubleValue();

#define LET_DOUBLE_ARG(I, VAR) USE_DOUBLE_ARG(I, VAR, 0.0)


#define REQ_FLOAT_ARG(I, VAR)                                                 \
	CHECK_REQ_ARG(I, IsNumber(), "Number");                                   \
	float VAR = info[I].ToNumber().FloatValue();

#define USE_FLOAT_ARG(I, VAR, DEF)                                            \
	CHECK_LET_ARG(I, IsNumber(), "Number");                                   \
	float VAR = IS_ARG_EMPTY(I) ? (DEF) : info[I].ToNumber().FloatValue();

#define LET_FLOAT_ARG(I, VAR) USE_FLOAT_ARG(I, VAR, 0.f)


#define REQ_EXT_ARG(I, VAR)                                                   \
	CHECK_REQ_ARG(I, IsExternal(), "Pointer");                                \
	Napi::External<void> VAR = info[I].As< Napi::External<void> >();

#define USE_EXT_ARG(I, VAR, DEF)                                              \
	CHECK_LET_ARG(I, IsExternal(), "Pointer");                                \
	Napi::External<void> VAR = IS_ARG_EMPTY(I)                                \
		? (DEF)                                                               \
		: info[I].As< Napi::External<void> >();

#define LET_EXT_ARG(I, VAR) USE_EXT_ARG(I, VAR, JS_EXT(nullptr))


#define REQ_FUN_ARG(I, VAR)                                                   \
	CHECK_REQ_ARG(I, IsFunction(), "Function");                               \
	Napi::Function VAR = info[I].As<Napi::Function>();


#define REQ_OBJ_ARG(I, VAR)                                                   \
	CHECK_REQ_ARG(I, IsObject(), "Object");                                   \
	Napi::Object VAR = info[I].As<Napi::Object>();

#define USE_OBJ_ARG(I, VAR, DEF)                                              \
	CHECK_LET_ARG(I, IsObject(), "Object");                                   \
	Napi::Object VAR = IS_ARG_EMPTY(I) ? (DEF) : info[I].As<Napi::Object>();

#define LET_OBJ_ARG(I, VAR) USE_OBJ_ARG(I, VAR, info[I].As<Napi::Object>())


#define REQ_ARRV_ARG(I, VAR)                                                  \
	CHECK_REQ_ARG(I, IsArrayBuffer(), "Object");                              \
	Napi::ArrayBuffer VAR = info[I].As<Napi::ArrayBuffer>();


#define REQ_BUF_ARG(I, VAR)                                                   \
	CHECK_REQ_ARG(I, IsBuffer(), "Buffer");                                   \
	Napi::Buffer<uint8_t> VAR = info[I].As< Napi::Buffer<uint8_t> >();


#define REQ_ARRAY_ARG(I, VAR)                                                 \
	REQ_OBJ_ARG(I, _obj_##VAR);                                               \
	if ( ! _obj_##VAR.IsArray() ) {                                           \
		JS_THROW("Argument " #I " must  be of type `Array`");                 \
	}                                                                         \
	Napi::Array VAR = _obj_##VAR.As<Napi::Array>();


#define REQ_TYPED_ARRAY_ARG(I, VAR)                                           \
	REQ_OBJ_ARG(I, _obj_##VAR);                                               \
	if ( ! _obj_##VAR.IsTypedArray() ) {                                      \
		JS_THROW("Argument " #I " must be of type `TypedArray`");             \
	}                                                                         \
	Napi::TypedArray VAR = _obj_##VAR.As<Napi::TypedArray>();


#define CTOR_CHECK(T)                                                         \
	if ( ! info.IsConstructCall() )                                           \
		JS_THROW(T " must be called with the 'new' keyword.");

#define DES_CHECK                                                             \
	if (_isDestroyed) return;

#define THIS_CHECK                                                            \
	NAPI_ENV;                                                                 \
	if (_isDestroyed) RET_UNDEFINED;

#define CACHE_CAS(CACHE, V)                                                   \
	if (CACHE == V) {                                                         \
		return;                                                               \
	}                                                                         \
	CACHE = V;

#define THIS_SETTER_CHECK                                                     \
	if (_isDestroyed) return;                                                 \
	NAPI_ENV;

#define SETTER_CHECK(C, T)                                                    \
	if ( ! value.C )                                                          \
		JS_THROW("Value must be " T);


#define JS_METHOD(NAME) Napi::Value NAME(const Napi::CallbackInfo &info)
#define JS_GETTER(NAME) Napi::Value NAME(const Napi::CallbackInfo &info)
#define JS_SETTER(NAME)                                                       \
	void NAME(const Napi::CallbackInfo &info, const Napi::Value &value)

#define ACCESSOR_RW(CLASS, NAME)                                              \
	InstanceAccessor(#NAME, &CLASS::NAME ## Getter, &CLASS::NAME ## Setter)

#define ACCESSOR_R(CLASS, NAME)                                               \
	InstanceAccessor(#NAME, &CLASS::NAME ## Getter, nullptr)

#define ACCESSOR_M(CLASS, NAME)                                               \
	InstanceMethod(#NAME, &CLASS::NAME)

#define THIS_OBJ(VAR)                                                         \
	Napi::Object VAR = info.This().As<Napi::Object>();

#define SETTER_STR_ARG                                                        \
	SETTER_CHECK(IsString(), "String");                                       \
	std::string v = value.ToString().Utf8Value();

#define SETTER_INT32_ARG                                                      \
	SETTER_CHECK(IsNumber(), "Int32");                                        \
	int v = value.ToNumber().Int32Value();

#define SETTER_INT_ARG SETTER_INT32_ARG

#define SETTER_BOOL_ARG                                                       \
	SETTER_CHECK(IsBoolean(), "Bool");                                        \
	bool v = value.ToBoolean().Value();

#define SETTER_UINT32_ARG                                                     \
	SETTER_CHECK(IsNumber(), "Uint32");                                       \
	unsigned int v = value.ToNumber().Uint32Value();

#define SETTER_UINT_ARG SETTER_UINT32_ARG

#define SETTER_OFFS_ARG                                                       \
	SETTER_CHECK(IsNumber(), "Number");                                       \
	size_t v = static_cast<size_t>(value.ToNumber().DoubleValue());

#define SETTER_DOUBLE_ARG                                                     \
	SETTER_CHECK(IsNumber(), "Number");                                       \
	double v = value.ToNumber().DoubleValue();

#define SETTER_FLOAT_ARG                                                      \
	SETTER_CHECK(IsNumber(), "Number");                                       \
	float v = value.ToNumber().FloatValue();

#define SETTER_EXT_ARG                                                        \
	SETTER_CHECK(IsExternal(), "Pointer");                                    \
	Napi::External v = value.As<Napi::External>();

#define SETTER_FUN_ARG                                                        \
	SETTER_CHECK(IsFunction(), "Function");                                   \
	Napi::Function v = value.As<Napi::Function>()

#define SETTER_OBJ_ARG                                                        \
	SETTER_CHECK(IsObject(), "Object");                                       \
	Napi::Object v = value.As<Napi::Object>()

#define SETTER_ARRV_ARG                                                       \
	SETTER_CHECK(IsArrayBuffer(), "TypedArray");                              \
	Napi::ArrayBuffer v = value.As<Napi::ArrayBuffer>();


#define GET_AND_THROW_LAST_ERROR()                                            \
	do {                                                                      \
		const napi_extended_error_info *error_info;                           \
		napi_get_last_error_info((env), &error_info);                         \
		bool is_pending;                                                      \
		napi_is_exception_pending((env), &is_pending);                        \
		/* If an exception is already pending, don't rethrow it */            \
		if (!is_pending) {                                                    \
			const char* error_message = error_info->error_message != NULL     \
				? error_info->error_message                                   \
				: "empty error message";                                      \
			JS_THROW(error_message);                                          \
		}                                                                     \
	} while (0)

#define NAPI_CALL(the_call, ATE)                                              \
	do {                                                                      \
		if ((the_call) != napi_ok) {                                          \
			GET_AND_THROW_LAST_ERROR();                                       \
			ATE;                                                              \
		}                                                                     \
	} while (0)

#define JS_RUN_3(code, VAR, ATE)                                              \
	napi_value __RESULT_ ## VAR;                                              \
	NAPI_CALL(                                                                \
		napi_run_script(env, napi_value(JS_STR(code)), &__RESULT_ ## VAR),    \
		ATE                                                                   \
	);                                                                        \
	Napi::Value VAR(env, __RESULT_ ## VAR);

#define JS_RUN_2(code, VAR) JS_RUN_3(code, VAR, return)
#define JS_RUN JS_RUN_3


template<typename Type = uint8_t>
inline Type* getArrayData(Napi::Env env, Napi::Object obj, int *num = nullptr) {
	
	Type *data = nullptr;
	
	if (obj.IsTypedArray()) {
		Napi::TypedArray ta = obj.As<Napi::TypedArray>();
		size_t offset = ta.ByteOffset();
		Napi::ArrayBuffer arr = ta.ArrayBuffer();
		if (num) {
			*num = arr.ByteLength() / sizeof(Type);
		}
		uint8_t *base = reinterpret_cast<uint8_t *>(arr.Data());
		data = reinterpret_cast<Type *>(base + offset);
	} else if (obj.IsArrayBuffer()) {
		Napi::ArrayBuffer arr = obj.As<Napi::ArrayBuffer>();
		if (num) {
			*num = arr.ByteLength() / sizeof(Type);
		}
		data = reinterpret_cast<Type *>(arr.Data());
	} else {
		if (num) {
			*num = 0;
		}
		JS_THROW("Argument must be of type `TypedArray`.");
	}
	
	return data;
	
}

template<typename Type = uint8_t>
inline Type* getBufferData(Napi::Env env, Napi::Object obj, int *num = nullptr) {
	
	Type *data = nullptr;
	
	if (num) {
		*num = 0;
	}
	
	if ( ! obj.IsBuffer() ) {
		JS_THROW("Argument must be of type `Buffer`.");
		return data;
	}
	
	Napi::Buffer<uint8_t> arr = obj.As< Napi::Buffer<uint8_t> >();
	if (num) {
		*num = arr.Length() / sizeof(Type);
	}
	data = arr.Data();
	
	return data;
	
}


inline void *getData(Napi::Env env, Napi::Object obj) {
	
	void *pixels = nullptr;
	
	if (obj.IsTypedArray() || obj.IsArrayBuffer()) {
		pixels = getArrayData<uint8_t>(env, obj);
	} else if (obj.Has("data")) {
		Napi::Object data = obj.Get("data").As<Napi::Object>();
		if (data.IsTypedArray() || data.IsArrayBuffer()) {
			pixels = getArrayData<uint8_t>(env, data);
		} else if (data.IsBuffer()) {
			pixels = getBufferData<uint8_t>(env, data);
		}
	}
	
	return pixels;
	
}


inline void consoleLog(Napi::Env env, int argc, const Napi::Value *argv) {
	JS_RUN_2("console.log", log);
	std::vector<napi_value> args;
	for (int i = 0; i < argc; i++) {
		args.push_back(napi_value(argv[i]));
	}
	log.As<Napi::Function>().Call(args);
}


inline void consoleLog(Napi::Env env, const std::string &message) {
	Napi::Value arg = JS_STR(message);
	consoleLog(env, 1, &arg);
}


inline void eventEmit(
	Napi::Object that,
	const std::string &name,
	int argc = 0,
	const Napi::Value *argv = nullptr
) {
	
	if ( ! that.Has("emit") ) {
		return;
	}
	
	Napi::Env env = that.Env();
	
	Napi::String eventName = JS_STR(name);
	Napi::Function thatEmit = that.Get("emit").As<Napi::Function>();
	
	std::vector<napi_value> args;
	args.push_back(napi_value(eventName));
	for (int i = 0; i < argc; i++) {
		args.push_back(napi_value(argv[i]));
	}
	
	thatEmit.Call(that, args);
	
}


inline void eventEmitAsync(
	Napi::Object that,
	const std::string &name,
	int argc = 0,
	const Napi::Value *argv = nullptr,
	napi_async_context context = nullptr
) {
	
	if ( ! that.Has("emit") ) {
		return;
	}
	
	Napi::Env env = that.Env();
	
	Napi::String eventName = JS_STR(name);
	Napi::Function thatEmit = that.Get("emit").As<Napi::Function>();
	
	std::vector<napi_value> args;
	args.push_back(napi_value(eventName));
	for (int i = 0; i < argc; i++) {
		args.push_back(napi_value(argv[i]));
	}
	
	thatEmit.MakeCallback(that, args, context);
	
}


inline void inheritEs5(napi_env env, Napi::Function ctor, Napi::Function superCtor) {
	
	napi_value global, globalObject, setProto, ctorProtoProp, superCtorProtoProp;
	napi_value argv[2];
	
	napi_get_global(env, &global);
	napi_get_named_property(env, global, "Object", &globalObject);
	napi_get_named_property(env, globalObject, "setPrototypeOf", &setProto);
	napi_get_named_property(env, ctor, "prototype", &ctorProtoProp);
	napi_get_named_property(env, superCtor, "prototype", &superCtorProtoProp);
	
	argv[0] = ctorProtoProp;
	argv[1] = superCtorProtoProp;
	napi_call_function(env, global, setProto, 2, argv, nullptr);
	
	argv[0] = ctor;
	argv[1] = superCtor;
	napi_call_function(env, global, setProto, 2, argv, nullptr);
	
	ctor.Set("super_", superCtor);
	
}


typedef Napi::Value (*Es5MethodCallback)(const Napi::CallbackInfo& info);
typedef Napi::Value (*Es5GetterCallback)(const Napi::CallbackInfo& info);
typedef void (*Es5SetterCallback)(const Napi::CallbackInfo& info);


#define DECLARE_ES5_CLASS(CLASS, NAME) \
private: \
	static Napi::FunctionReference _ctorEs5; \
	static const char *_nameEs5; \
	static void CLASS::_finalizeEs5(napi_env e, void *dest, void* hint); \
	static napi_value CLASS::_createEs5(napi_env e, napi_callback_info i); \
	inline void super( \
		const Napi::CallbackInfo& info, \
		int argc, \
		const Napi::Value *argv \
	) { \
		Napi::Function ctor = _ctorEs5.Value(); \
		if (ctor.Has("super_")) { \
			Napi::Function _super = ctor.Get("super_").As<Napi::Function>(); \
			std::vector<napi_value> args; \
			for (int i = 0; i < argc; i++) { \
				args.push_back(argv[i]); \
			} \
			_super.Call(info.This(), args); \
		} \
	} \
	inline void super( \
		const Napi::CallbackInfo& info, \
		int argc = 0, \
		const napi_value *argv = nullptr \
	) { \
		Napi::Function ctor = _ctorEs5.Value(); \
		if (ctor.Has("super_")) { \
			Napi::Function _super = ctor.Get("super_").As<Napi::Function>(); \
			_super.Call(info.This(), argc, argv); \
		} \
	} \
	inline static Napi::Function wrap(Napi::Env env) { \
		napi_value __initResult; \
		napi_create_function(env, #NAME, 0, CLASS::_createEs5, nullptr, &__initResult); \
		Napi::Function ctor = Napi::Function(env, __initResult); \
		_ctorEs5 = Napi::Persistent(ctor); \
		_ctorEs5.SuppressDestruct(); \
		return ctor; \
	} \
	inline static Napi::Function wrap( \
		Napi::Env env, \
		Napi::Function superCtor \
	) { \
		Napi::Function ctor = wrap(env); \
		inheritEs5(env, ctor, superCtor); \
		return ctor; \
	} \
	inline static void method( \
		const char *name, \
		Es5MethodCallback cb \
	) { \
		Napi::Function proto = _ctorEs5.Value().Get("prototype").As<Napi::Function>(); \
		proto.DefineProperty(                                                   \
			Napi::PropertyDescriptor::Function(proto.Env(), proto, name, cb)   \
		); \
	} \
	inline static void accessorR( \
		const char *name, \
		Es5GetterCallback getter \
	) { \
		Napi::Function proto = _ctorEs5.Value().Get("prototype").As<Napi::Function>(); \
		proto.DefineProperty(                                                   \
			Napi::PropertyDescriptor::Accessor(proto.Env(), proto, name, getter)   \
		); \
	} \
	inline static void accessorRw( \
		const char *name, \
		Es5GetterCallback getter, \
		Es5SetterCallback setter \
	) { \
		Napi::Function proto = _ctorEs5.Value().Get("prototype").As<Napi::Function>(); \
		proto.DefineProperty(                                                   \
			Napi::PropertyDescriptor::Accessor( \
				proto.Env(), \
				proto, \
				name, \
				getter, \
				setter \
			)   \
		); \
	} \
public: \
	inline static CLASS *unwrap(Napi::Object thatObj) { \
		CLASS *that; \
		napi_unwrap( \
			thatObj.Env(), \
			thatObj.Get(_nameEs5), \
			reinterpret_cast<void**>(&that) \
		); \
		return that; \
	}


#define JS_GET_THAT(CLASS) \
	CLASS *that; \
	Napi::Object thatObj = info.This().As<Napi::Object>(); \
	napi_unwrap(info.Env(), thatObj.Get(_nameEs5), reinterpret_cast<void**>(&that));

#define JS_DECLARE_METHOD(CLASS, NAME) \
	inline static Napi::Value __st_##NAME(const Napi::CallbackInfo &info) { \
		JS_GET_THAT(CLASS); \
		return that->__i_##NAME(info); \
	}; \
	Napi::Value __i_##NAME(const Napi::CallbackInfo &info);

#define JS_DECLARE_GETTER(CLASS, NAME) JS_DECLARE_METHOD(CLASS, NAME##Getter)

#define JS_DECLARE_SETTER(CLASS, NAME)                                                       \
	inline static void __st_##NAME##Setter( \
		const Napi::CallbackInfo &info \
	) { \
		JS_GET_THAT(CLASS); \
		that->__i_##NAME##Setter(info, info[0]); \
	}; \
	void __i_##NAME##Setter(const Napi::CallbackInfo &info, const Napi::Value &value);

#define JS_IMPLEMENT_METHOD(CLASS, NAME) \
	Napi::Value CLASS::__i_##NAME(const Napi::CallbackInfo &info)

#define JS_IMPLEMENT_GETTER(CLASS, NAME) JS_IMPLEMENT_METHOD(CLASS, NAME##Getter)

#define JS_IMPLEMENT_SETTER(CLASS, NAME) \
	void CLASS::__i_##NAME##Setter( \
		const Napi::CallbackInfo &info, \
		const Napi::Value &value \
	)

#define JS_ASSIGN_METHOD(NAME) method(#NAME, __st_##NAME)
#define JS_ASSIGN_GETTER(NAME) accessorR(#NAME, __st_##NAME##Getter)
#define JS_ASSIGN_SETTER(NAME) accessorRw(#NAME, __st_##NAME##Getter, __st_##NAME##Setter)

#define IMPLEMENT_ES5_CLASS(CLASS) \
	Napi::FunctionReference CLASS::_ctorEs5; \
	const char *CLASS::_nameEs5 = #CLASS; \
	void CLASS::_finalizeEs5(napi_env e, void *dest, void* hint) { \
		CLASS *instance = reinterpret_cast<CLASS*>(dest); \
		delete instance; \
	} \
	napi_value CLASS::_createEs5(napi_env env, napi_callback_info i) { \
		Napi::CallbackInfo info(env, i); \
		CLASS *instance = new CLASS(info); \
		Napi::Object wrapObj = Napi::Object::New(env); \
		info.This().As<Napi::Object>().Set(_nameEs5, wrapObj); \
		napi_wrap(env, wrapObj, instance, CLASS::_finalizeEs5, nullptr, nullptr); \
		return info.Env().Undefined(); \
	}


#endif // _ADDON_TOOLS_HPP_
