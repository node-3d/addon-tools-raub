#ifndef _ADDON_TOOLS_HPP_
#define _ADDON_TOOLS_HPP_


#include <nan.h>


#define NAN_HS Nan::HandleScope scope;


#define RET_VALUE(VAL) info.GetReturnValue().Set(VAL);
#define RET_UNDEFINED RET_VALUE(Nan::Undefined());


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
#define JS_ARRV(val) Nan::New<v8::Object>(val)


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
	Nan::Utf8String VAR(info[I]);


#define REQ_INT32_ARG(I, VAR)                                                 \
	CHECK_REQ_ARG(I, IsInt32(), "int32");                                     \
	int VAR = info[I]->Int32Value();

#define LET_INT32_ARG(I, VAR)                                                 \
	CHECK_LET_ARG(I, IsInt32(), "int32");                                     \
	int VAR = IS_ARG_EMPTY(I) ? 0 : info[I]->Int32Value();


#define REQ_BOOL_ARG(I, VAR)                                                  \
	CHECK_REQ_ARG(I, IsBoolean(), "bool");                                    \
	bool VAR = info[I]->BooleanValue();

#define LET_BOOL_ARG(I, VAR)                                                  \
	CHECK_LET_ARG(I, IsBoolean(), "bool");                                    \
	bool VAR = IS_ARG_EMPTY(I) ? false : info[I]->BooleanValue();


#define REQ_UINT32_ARG(I, VAR)                                                \
	CHECK_REQ_ARG(I, IsUint32(), "uint32");                                   \
	unsigned int VAR = info[I]->Uint32Value();

#define LET_UINT32_ARG(I, VAR)                                                \
	CHECK_LET_ARG(I, IsUint32(), "uint32");                                   \
	unsigned int VAR = IS_ARG_EMPTY(I) ? 0 : info[I]->Uint32Value();


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
	v8::Local<v8::External> VAR = v8::Local<v8::External>::Cast(info[I]);

#define LET_EXT_ARG(I, VAR)                                                   \
	CHECK_LET_ARG(I, IsExternal(), "number");                                 \
	v8::Local<v8::External> VAR = IS_ARG_EMPTY(I) ? JS_EXT(NULL) :            \
		v8::Local<v8::External>::Cast(info[I]);


#define REQ_FUN_ARG(I, VAR)                                                   \
	CHECK_REQ_ARG(I, IsFunction(), "function");                               \
	v8::Local<v8::Function> VAR = v8::Local<v8::Function>::Cast(info[I]);


#define REQ_OBJ_ARG(I, VAR)                                                   \
	CHECK_REQ_ARG(I, IsObject(), "object");                                   \
	v8::Local<v8::Object> VAR = v8::Local<v8::Object>::Cast(info[I]);


#define REQ_ARRV_ARG(I, VAR)                                                  \
	REQ_OBJ_ARG(I, _obj_##VAR);                                               \
	if( ! _obj_##VAR->IsArrayBufferView() )                                   \
		return Nan::ThrowTypeError("Argument " #I " must be an array buffer");\
	v8::Local<v8::ArrayBufferView> VAR = v8::Local<v8::ArrayBufferView>::Cast(_obj_##VAR);


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

#define SETTER_INT32_ARG                                                      \
	SETTER_CHECK(IsInt32(), "int32");                                         \
	int v = value->Int32Value();

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
	v8::Local<v8::External> v = v8::Local<v8::External>::Cast(value);

#define SETTER_FUN_ARG                                                        \
	SETTER_CHECK(IsFunction(), "function");                                   \
	v8::Local<v8::Function> v = v8::Local<v8::Function>::Cast(value);

#define SETTER_OBJ_ARG                                                        \
	SETTER_CHECK(IsObject(), "object");                                       \
	v8::Local<v8::Object> v = v8::Local<v8::Object>::Cast(value);


template<typename Type>
inline Type* getArrayData(v8::Local<v8::Value> arg, int *num = NULL) {
	
	Type *data = NULL;
	
	if (num) {
		*num = 0;
	}
	
	if (arg->IsNull() || arg->IsUndefined()) {
		return data;
	}
	
	if (arg->IsArray()) {
		Nan::ThrowError("JS Array is not supported here.");
		return data;
	}
	
	if ( ! arg->IsArrayBufferView() ) {
		Nan::ThrowError("Argument must be a TypedArray.");
		return data;
	}
	
	v8::Local<v8::ArrayBufferView> arr = v8::Local<v8::ArrayBufferView>::Cast(arg);
	if (num) {
		*num = arr->ByteLength() / sizeof(Type);
	}
	data = reinterpret_cast<Type*>(arr->Buffer()->GetContents().Data());
	
	return data;
	
}


inline void *getImageData(v8::Local<v8::Value> arg) {
	
	void *pixels = NULL;
	
	if (arg->IsNull() || arg->IsUndefined()) {
		return pixels;
	}
	
	v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(arg);
	
	if ( ! obj->IsObject() ) {
		Nan::ThrowError("Bad Image argument");
		return pixels;
	}
	
	if (obj->IsArrayBufferView()) {
		pixels = getArrayData<unsigned char>(obj, NULL);
	} else if (obj->Has(JS_STR("data"))) {
		pixels = node::Buffer::Data(Nan::Get(obj, JS_STR("data")).ToLocalChecked());
	} else {
		Nan::ThrowError("Bad Image argument");
	}
	
	return pixels;
	
}


#endif // _ADDON_TOOLS_HPP_
