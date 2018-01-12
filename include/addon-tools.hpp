#ifndef _ADDON_TOOLS_HPP_
#define _ADDON_TOOLS_HPP_


#define NAN_HS Nan::HandleScope scope;


#define RET_VALUE(VAL) info.GetReturnValue().Set(VAL);
#define RET_UNDEFINED RET_VALUE(Nan::Undefined());


#define JS_STR(...) Nan::New<String>(__VA_ARGS__).ToLocalChecked()
#define JS_INT(val) Nan::New<v8::Integer>(val)
#define JS_NUM(val) Nan::New<v8::Number>(val)
#define JS_EXT(val) Nan::New<v8::External>(reinterpret_cast<void*>(val))
#define JS_BOOL(val) (val) ? Nan::True() : Nan::False()


#define JS_RETHROW(tc) v8::Local<v8::Value>::New(tc.Exception());


#define REQ_ARGS(N)                                                     \
	if (info.Length() < (N))                                            \
		return Nan::ThrowTypeError("Expected at least " #N " arguments");


#define IS_ARG_EMPTY(I) (info[I]->IsNull() || info[I]->IsUndefined())

#define CHECK_REQ_ARG(I, C, T)                                          \
	if (info.Length() <= (I) || ! info[I]->C)                           \
		return Nan::ThrowTypeError("Argument " #I " must be " T);

#define CHECK_LET_ARG(I, C, T)                                          \
	if ( ! (IS_ARG_EMPTY(I) || info[I]->C) )                            \
		return Nan::ThrowTypeError("Argument " #I " must be " T " or null");


#define REQ_UTF8_ARG(I, VAR)                                            \
	CHECK_REQ_ARG(I, IsString(), "string");                             \
	Nan::Utf8String VAR(info[I]);

#define LET_UTF8_ARG(I, VAR)                                            \
	CHECK_LET_ARG(I, IsString(), "string");                             \
	Nan::Utf8String VAR(info[I]);


#define REQ_INT32_ARG(I, VAR)                                           \
	CHECK_REQ_ARG(I, IsInt32(), "int32");                               \
	int VAR = info[I]->Int32Value();

#define LET_INT32_ARG(I, VAR)                                           \
	CHECK_LET_ARG(I, IsInt32(), "int32");                               \
	int VAR = IS_ARG_EMPTY(I) ? 0 : info[I]->Int32Value();


#define REQ_BOOL_ARG(I, VAR)                                            \
	CHECK_REQ_ARG(I, IsBoolean(), "bool");                              \
	int VAR = info[I]->BooleanValue();

#define LET_BOOL_ARG(I, VAR)                                            \
	CHECK_LET_ARG(I, IsBoolean(), "bool");                              \
	int VAR = IS_ARG_EMPTY(I) ? false : info[I]->BooleanValue();


#define REQ_UINT32_ARG(I, VAR)                                          \
	CHECK_REQ_ARG(I, IsUint32(), "uint32");                             \
	unsigned int VAR = info[I]->Uint32Value();

#define LET_UINT32_ARG(I, VAR)                                          \
	CHECK_LET_ARG(I, IsUint32(), "uint32");                             \
	unsigned int VAR = IS_ARG_EMPTY(I) ? 0 : info[I]->Uint32Value();


#define REQ_OFFS_ARG(I, VAR)                                            \
	CHECK_REQ_ARG(I, IsNumber(), "number");                             \
	size_t VAR = static_cast<size_t>(info[I]->IntegerValue());

#define LET_OFFS_ARG(I, VAR)                                            \
	CHECK_LET_ARG(I, IsNumber(), "number");                             \
	size_t VAR = IS_ARG_EMPTY(I) ? 0 : static_cast<size_t>(info[I]->IntegerValue());


#define REQ_DOUBLE_ARG(I, VAR)                                          \
	CHECK_REQ_ARG(I, IsNumber(), "number");                             \
	double VAR = info[I]->NumberValue();

#define LET_DOUBLE_ARG(I, VAR)                                          \
	CHECK_LET_ARG(I, IsNumber(), "number");                             \
	double VAR = IS_ARG_EMPTY(I) ? 0.0 : info[I]->NumberValue();


#define REQ_FLOAT_ARG(I, VAR)                                           \
	CHECK_REQ_ARG(I, IsNumber(), "number");                             \
	float VAR = static_cast<float>(info[I]->NumberValue());

#define LET_FLOAT_ARG(I, VAR)                                           \
	CHECK_LET_ARG(I, IsNumber(), "number");                             \
	float VAR = IS_ARG_EMPTY(I) ? 0.f : static_cast<float>(info[I]->NumberValue());


#define REQ_EXT_ARG(I, VAR)                                             \
	CHECK_REQ_ARG(I, IsExternal(), "void*");                            \
	Local<External> VAR = Local<External>::Cast(info[I]);

#define LET_EXT_ARG(I, VAR)                                             \
	CHECK_LET_ARG(I, IsExternal(), "number");                           \
	Local<External> VAR = IS_ARG_EMPTY(I) ? JS_EXT(NULL) : Local<External>::Cast(info[I]);


#define REQ_FUN_ARG(I, VAR)                                             \
	CHECK_REQ_ARG(I, IsFunction(), "function");                         \
	Local<Function> VAR = Local<Function>::Cast(info[I]);


#define REQ_OBJ_ARG(I, VAR)                                             \
	CHECK_REQ_ARG(I, IsObject(), "object");                             \
	Local<Object> VAR = Local<Object>::Cast(info[I]);


#define REQ_ARRV_ARG(I, VAR)                                            \
	REQ_OBJ_ARG(I, _obj_##VAR);                                         \
	if( ! _obj_##VAR->IsArrayBufferView() )                             \
		return Nan::ThrowTypeError("Argument " #I " must be an array buffer"); \
	Local<ArrayBufferView> VAR = Local<ArrayBufferView>::Cast(_obj_##VAR);


#define SET_PROP(OBJ, KEY, VAL) OBJ->Set(JS_STR(KEY), VAL);


#define CTOR_CHECK(T)                                                   \
	if ( ! info.IsConstructCall() )                                     \
		return Nan::ThrowTypeError(T " must be called with the 'new' keyword.");

#define ACCESSOR_RW(OBJ, NAME)                                          \
	Nan::SetAccessor(OBJ, JS_STR(#NAME), NAME ## Getter, NAME ## Setter);

#define ACCESSOR_R(OBJ, NAME)                                           \
	Nan::SetAccessor(OBJ, JS_STR(#NAME), NAME ## Getter);

#define SET_I(ARR, I, VAL) ARR->Set(I, VAL);


#define SETTER_CHECK(C, T)                                              \
	if ( ! value->C )                                                   \
		return Nan::ThrowTypeError("Value must be " T);


#define SETTER_UTF8_ARG                                                 \
	SETTER_CHECK(IsString(), "string");                                 \
	Nan::Utf8String v(value);

#define SETTER_INT32_ARG                                                \
	SETTER_CHECK(IsInt32(), "int32");                                   \
	int v = value->Int32Value();

#define SETTER_BOOL_ARG                                                 \
	SETTER_CHECK(IsBoolean(), "bool");                                  \
	bool v = value->BooleanValue(); // TODO APPLY bool TO REQ_BOOL_ARG

#define SETTER_UINT32_ARG                                               \
	SETTER_CHECK(IsUint32(), "uint32");                                 \
	unsigned int v = value->Uint32Value();

#define SETTER_OFFS_ARG                                                 \
	SETTER_CHECK(IsNumber(), "number");                                 \
	size_t v = static_cast<size_t>(value->IntegerValue());

#define SETTER_DOUBLE_ARG                                               \
	SETTER_CHECK(IsNumber(), "number");                                 \
	double v = value->NumberValue();

#define SETTER_FLOAT_ARG                                                \
	SETTER_CHECK(IsNumber(), "number");                                 \
	float v = static_cast<float>(value->NumberValue());

#define SETTER_EXT_ARG                                                  \
	SETTER_CHECK(IsExternal(), "void*");                                \
	Local<External> v = Local<External>::Cast(value);

#define SETTER_FUN_ARG                                                  \
	SETTER_CHECK(IsFunction(), "function");                             \
	Local<Function> v = Local<Function>::Cast(value);

#define SETTER_OBJ_ARG                                                  \
	SETTER_CHECK(IsObject(), "object");                                 \
	Local<Object> v = Local<Object>::Cast(value);


#endif // _ADDON_TOOLS_HPP_
