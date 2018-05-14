#ifndef _ADDON_TOOLS_HPP_
#define _ADDON_TOOLS_HPP_


#include <nan.h>


#define NAN_HS Nan::HandleScope scope;


#define RET_VALUE(VAL) info.GetReturnValue().Set(VAL);
#define RET_UNDEFINED RET_VALUE(Nan::Undefined());


typedef v8::Local<v8::Value> V8_VAR_VAL;
typedef v8::Local<v8::Object> V8_VAR_OBJ;
typedef v8::Local<v8::Array> V8_VAR_ARR;
typedef v8::Local<v8::ArrayBufferView> V8_VAR_ABV;
typedef v8::Local<v8::String> V8_VAR_STR;
typedef v8::Local<v8::Function> V8_VAR_FUNC;
typedef v8::Local<v8::External> V8_VAR_EXT;
typedef v8::Local<v8::FunctionTemplate> V8_VAR_FT;
typedef v8::Local<v8::ObjectTemplate> V8_VAR_OT;

typedef Nan::Persistent<v8::FunctionTemplate> V8_STORE_FT;
typedef Nan::Persistent<v8::Function> V8_STORE_FUNC;
typedef Nan::Persistent<v8::Object> V8_STORE_OBJ;
typedef Nan::Persistent<v8::Value> V8_STORE_VAL;


#define JS_STR(...) Nan::New<v8::String>(__VA_ARGS__).ToLocalChecked()
#define JS_UTF8(...) Nan::New<v8::String>(__VA_ARGS__).ToLocalChecked()
#define JS_INT(val) Nan::New<v8::Integer>(val)
#define JS_INT32(val) Nan::New<v8::Integer>(val)
#define JS_UINT32(val) Nan::New<v8::Integer>(val)
#define JS_NUM(val) Nan::New<v8::Number>(val)
#define JS_OFFS(val) Nan::New<v8::Number>(static_cast<double>(val))
#define JS_FLOAT(val) Nan::New<v8::Number>(val)
#define JS_DOUBLE(val) Nan::New<v8::Number>(val)
#define JS_EXT(val) Nan::New<v8::External>(reinterpret_cast<void*>(val))
#define JS_BOOL(val) (val) ? Nan::True() : Nan::False()
#define JS_FUN(val) Nan::New<v8::Function>(val)
#define JS_OBJ(val) Nan::New<v8::Object>(val)


#define REQ_ARGS(N)                                                           \
	if (info.Length() < (N))                                                  \
		return Nan::ThrowTypeError("Expected at least " #N " arguments");


#define IS_ARG_EMPTY(I) (info[I]->IsNull() || info[I]->IsUndefined())

#define CHECK_REQ_ARG(I, C, T)                                                \
	if (info.Length() <= (I) || ! info[I]->C)                                 \
		return Nan::ThrowTypeError("Argument " #I " must be " T);

#define CHECK_LET_ARG(I, C, T)                                                \
	if ( ! (IS_ARG_EMPTY(I) || info[I]->C) )                                  \
		return Nan::ThrowTypeError("Argument " #I " must be " T " or null");


#define REQ_UTF8_ARG(I, VAR)                                                  \
	CHECK_REQ_ARG(I, IsString(), "string");                                   \
	Nan::Utf8String VAR(info[I]);

#define LET_UTF8_ARG(I, VAR)                                                  \
	CHECK_LET_ARG(I, IsString(), "string");                                   \
	Nan::Utf8String VAR(JS_STR(""));

#define REQ_STR_ARG(I, VAR) REQ_UTF8_ARG(I, VAR)
#define LET_STR_ARG(I, VAR) LET_UTF8_ARG(I, VAR)

#define REQ_INT32_ARG(I, VAR)                                                 \
	CHECK_REQ_ARG(I, IsInt32(), "int32");                                     \
	int VAR = info[I]->Int32Value();

#define LET_INT32_ARG(I, VAR)                                                 \
	CHECK_LET_ARG(I, IsInt32(), "int32");                                     \
	int VAR = IS_ARG_EMPTY(I) ? 0 : info[I]->Int32Value();
	
#define REQ_UINT32_ARG(I, VAR)                                                \
	CHECK_REQ_ARG(I, IsUint32(), "uint32");                                   \
	unsigned int VAR = info[I]->Uint32Value();

#define LET_UINT32_ARG(I, VAR)                                                \
	CHECK_LET_ARG(I, IsUint32(), "uint32");                                   \
	unsigned int VAR = IS_ARG_EMPTY(I) ? 0 : info[I]->Uint32Value();

#define REQ_INT_ARG(I, VAR) LET_INT32_ARG(I, VAR)
#define LET_INT_ARG(I, VAR) REQ_UINT32_ARG(I, VAR)

#define REQ_BOOL_ARG(I, VAR)                                                  \
	CHECK_REQ_ARG(I, IsBoolean(), "bool");                                    \
	bool VAR = info[I]->BooleanValue();

#define LET_BOOL_ARG(I, VAR)                                                  \
	CHECK_LET_ARG(I, IsBoolean(), "bool");                                    \
	bool VAR = IS_ARG_EMPTY(I) ? false : info[I]->BooleanValue();

#define REQ_OFFS_ARG(I, VAR)                                                  \
	CHECK_REQ_ARG(I, IsNumber(), "number");                                   \
	size_t VAR = static_cast<size_t>(info[I]->IntegerValue());

#define LET_OFFS_ARG(I, VAR)                                                  \
	CHECK_LET_ARG(I, IsNumber(), "number");                                   \
	size_t VAR = IS_ARG_EMPTY(I) ? 0 : static_cast<size_t>(info[I]->IntegerValue());


#define REQ_DOUBLE_ARG(I, VAR)                                                \
	CHECK_REQ_ARG(I, IsNumber(), "number");                                   \
	double VAR = info[I]->NumberValue();

#define LET_DOUBLE_ARG(I, VAR)                                                \
	CHECK_LET_ARG(I, IsNumber(), "number");                                   \
	double VAR = IS_ARG_EMPTY(I) ? 0.0 : info[I]->NumberValue();


#define REQ_FLOAT_ARG(I, VAR)                                                 \
	CHECK_REQ_ARG(I, IsNumber(), "number");                                   \
	float VAR = static_cast<float>(info[I]->NumberValue());

#define LET_FLOAT_ARG(I, VAR)                                                 \
	CHECK_LET_ARG(I, IsNumber(), "number");                                   \
	float VAR = IS_ARG_EMPTY(I) ? 0.f : static_cast<float>(info[I]->NumberValue());


#define REQ_EXT_ARG(I, VAR)                                                   \
	CHECK_REQ_ARG(I, IsExternal(), "void*");                                  \
	V8_VAR_EXT VAR = V8_VAR_EXT::Cast(info[I]);

#define LET_EXT_ARG(I, VAR)                                                   \
	CHECK_LET_ARG(I, IsExternal(), "number");                                 \
	V8_VAR_EXT VAR = IS_ARG_EMPTY(I) ? JS_EXT(nullptr) : V8_VAR_EXT::Cast(info[I]);


#define REQ_FUN_ARG(I, VAR)                                                   \
	CHECK_REQ_ARG(I, IsFunction(), "function");                               \
	V8_VAR_FUNC VAR = V8_VAR_FUNC::Cast(info[I]);


#define REQ_OBJ_ARG(I, VAR)                                                   \
	CHECK_REQ_ARG(I, IsObject(), "object");                                   \
	V8_VAR_OBJ VAR = V8_VAR_OBJ::Cast(info[I]);


#define REQ_ARRV_ARG(I, VAR)                                                  \
	REQ_OBJ_ARG(I, _obj_##VAR);                                               \
	if( ! _obj_##VAR->IsArrayBufferView() )                                   \
		return Nan::ThrowTypeError("Argument " #I " must be an array buffer");\
	V8_VAR_ABV VAR = V8_VAR_ABV::Cast(_obj_##VAR);


#define SET_PROP(OBJ, KEY, VAL) OBJ->Set(JS_STR(KEY), VAL);
#define SET_I(ARR, I, VAL) ARR->Set(I, VAL);


#define CTOR_CHECK(T)                                                         \
	if ( ! info.IsConstructCall() )                                           \
		return Nan::ThrowTypeError(T " must be called with the 'new' keyword.");

#define DES_CHECK                                                             \
	if (_isDestroyed) return;

#define SETTER_CHECK(C, T)                                                    \
	if ( ! value->C )                                                         \
		return Nan::ThrowTypeError("Value must be " T);


#define ACCESSOR_RW(OBJ, NAME)                                                \
	Nan::SetAccessor(OBJ, JS_STR(#NAME), NAME ## Getter, NAME ## Setter);

#define ACCESSOR_R(OBJ, NAME)                                                 \
	Nan::SetAccessor(OBJ, JS_STR(#NAME), NAME ## Getter);


#define SETTER_UTF8_ARG                                                       \
	SETTER_CHECK(IsString(), "string");                                       \
	Nan::Utf8String v(value);

#define SETTER_STR_ARG SETTER_UTF8_ARG

#define SETTER_INT32_ARG                                                      \
	SETTER_CHECK(IsInt32(), "int32");                                         \
	int v = value->Int32Value();

#define SETTER_INT_ARG SETTER_INT32_ARG

#define SETTER_BOOL_ARG                                                       \
	SETTER_CHECK(IsBoolean(), "bool");                                        \
	bool v = value->BooleanValue();

#define SETTER_UINT32_ARG                                                     \
	SETTER_CHECK(IsUint32(), "uint32");                                       \
	unsigned int v = value->Uint32Value();

#define SETTER_OFFS_ARG                                                       \
	SETTER_CHECK(IsNumber(), "number");                                       \
	size_t v = static_cast<size_t>(value->IntegerValue());

#define SETTER_DOUBLE_ARG                                                     \
	SETTER_CHECK(IsNumber(), "number");                                       \
	double v = value->NumberValue();

#define SETTER_FLOAT_ARG                                                      \
	SETTER_CHECK(IsNumber(), "number");                                       \
	float v = static_cast<float>(value->NumberValue());

#define SETTER_EXT_ARG                                                        \
	SETTER_CHECK(IsExternal(), "void*");                                      \
	V8_VAR_EXT v = V8_VAR_EXT::Cast(value);

#define SETTER_FUN_ARG                                                        \
	SETTER_CHECK(IsFunction(), "function");                                   \
	V8_VAR_FUNC v = V8_VAR_FUNC::Cast(value);

#define SETTER_OBJ_ARG                                                        \
	SETTER_CHECK(IsObject(), "object");                                       \
	V8_VAR_OBJ v = V8_VAR_OBJ::Cast(value);

#define SETTER_ARRV_ARG                                                       \
	SETTER_CHECK(IsObject(), "object");                                       \
	V8_VAR_OBJ _obj_v = V8_VAR_OBJ::Cast(value);                              \
	if( ! _obj_v->IsArrayBufferView() )                                       \
		return Nan::ThrowTypeError("The value must be an array buffer");      \
	V8_VAR_ABV v = V8_VAR_ABV::Cast(_obj_v);
	


template<typename Type>
inline Type* getArrayData(V8_VAR_OBJ obj, int *num = nullptr) {
	
	Type *data = nullptr;
	
	if (num) {
		*num = 0;
	}
	
	if ( ! obj->IsArrayBufferView() ) {
		Nan::ThrowError("Argument must be a TypedArray.");
		return data;
	}
	
	V8_VAR_ABV arr = V8_VAR_ABV::Cast(obj);
	if (num) {
		*num = arr->ByteLength() / sizeof(Type);
	}
	data = reinterpret_cast<Type*>(arr->Buffer()->GetContents().Data());
	
	return data;
	
}


inline void *getData(V8_VAR_OBJ obj) {
	
	void *pixels = nullptr;
	
	if (obj->IsArrayBufferView()) {
		pixels = getArrayData<unsigned char>(obj);
	} else if (obj->Has(JS_STR("data"))) {
		V8_VAR_VAL data = Nan::Get(obj, JS_STR("data")).ToLocalChecked();
		if ( ! data->IsNullOrUndefined() ) {
			pixels = node::Buffer::Data(data);
		}
	}
	
	return pixels;
	
}


inline void consoleLog(int argc, V8_VAR_VAL *argv) {
	
	V8_VAR_STR code = JS_STR("((...args) => console.log(...args))");
	V8_VAR_FUNC log = V8_VAR_FUNC::Cast(v8::Script::Compile(code)->Run());
	
	Nan::Callback logCb(log);
	Nan::AsyncResource async("consoleLog()");
	
	logCb.Call(argc, argv, &async);
	
}


inline void consoleLog(const std::string &message) {
	
	V8_VAR_VAL arg = JS_STR(message);
	consoleLog(1, &arg);
	
}


#endif // _ADDON_TOOLS_HPP_
