#ifndef _ADDON_TOOLS_HPP_
#define _ADDON_TOOLS_HPP_


#define NAN_HS Nan::HandleScope scope;


#define RET_VALUE(VAL) info.GetReturnValue().Set(VAL);
#define RET_UNDEFINED RET_VALUE(Nan::Undefined());


#define JS_STR(...) Nan::New<String>(__VA_ARGS__).ToLocalChecked()
#define JS_INT(val) Nan::New<v8::Integer>(val)
#define JS_NUM(val) Nan::New<v8::Number>(val)
#define JS_BOOL(val) (val) ? Nan::True() : Nan::False()


#define JS_RETHROW(tc) v8::Local<v8::Value>::New(tc.Exception());


#define REQ_ARGS(N)                                                     \
	if (info.Length() < (N))                                            \
		Nan::ThrowTypeError("Expected at least " #N " arguments");


#define CHECK_REQ_ARG(I, C, T)                                          \
	if (info.Length() <= (I) || ! info[I]->C)                           \
		Nan::ThrowTypeError("Argument " #I " must be " T);

#define CHECK_LET_ARG(I, C, T)                                          \
	if ( ! (info[I]->IsNull() || info[I]->C) )                          \
		Nan::ThrowTypeError("Argument " #I " must be " T " or null");


#define REQ_UTF8_ARG(I, VAR)                                            \
	CHECK_REQ_ARG(I, IsString(), "string");                             \
	String::Utf8Value VAR(info[I]);

#define LET_UTF8_ARG(I, VAR)                                            \
	CHECK_LET_ARG(I, IsString(), "string");                             \
	String::Utf8Value VAR(info[I]->IsNull() ? JS_STR("") : info[I]);


#define REQ_INT32_ARG(I, VAR)                                           \
	CHECK_REQ_ARG(I, IsInt32(), "int32");                               \
	int VAR = info[I]->Int32Value();

#define LET_INT32_ARG(I, VAR)                                           \
	CHECK_LET_ARG(I, IsInt32(), "int32");                               \
	int VAR = info[I]->IsNull() ? 0 : info[I]->Int32Value();


#define REQ_BOOL_ARG(I, VAR)                                            \
	CHECK_REQ_ARG(I, IsBoolean(), "bool");                              \
	int VAR = info[I]->BooleanValue();

#define LET_BOOL_ARG(I, VAR)                                            \
	CHECK_LET_ARG(I, IsBoolean(), "bool");                              \
	int VAR = info[I]->IsNull() ? false : info[I]->BooleanValue();


#define REQ_UINT32_ARG(I, VAR)                                          \
	CHECK_REQ_ARG(I, IsUint32(), "uint32");                             \
	unsigned int VAR = info[I]->Uint32Value();

#define LET_UINT32_ARG(I, VAR)                                          \
	CHECK_LET_ARG(I, IsUint32(), "uint32");                             \
	unsigned int VAR = info[I]->IsNull() ? 0 : info[I]->Uint32Value();


#define REQ_OFFS_ARG(I, VAR)                                            \
	CHECK_REQ_ARG(I, IsNumber(), "number");                             \
	size_t VAR = static_cast<size_t>(info[I]->IntegerValue());

#define LET_OFFS_ARG(I, VAR)                                            \
	CHECK_LET_ARG(I, IsNumber(), "number");                             \
	size_t VAR = info[I]->IsNull() ? 0 : static_cast<size_t>(info[I]->IntegerValue());


#define REQ_DOUBLE_ARG(I, VAR)                                          \
	CHECK_REQ_ARG(I, IsNumber(), "number");                             \
	double VAR = info[I]->NumberValue();

#define LET_DOUBLE_ARG(I, VAR)                                          \
	CHECK_LET_ARG(I, IsNumber(), "number");                             \
	double VAR = info[I]->IsNull() ? 0.0 : info[I]->NumberValue();


#define REQ_FLOAT_ARG(I, VAR)                                           \
	CHECK_REQ_ARG(I, IsNumber(), "number");                             \
	float VAR = static_cast<float>(info[I]->NumberValue());

#define LET_FLOAT_ARG(I, VAR)                                           \
	CHECK_LET_ARG(I, IsNumber(), "number");                             \
	float VAR = info[I]->IsNull() ? 0.f : static_cast<float>(info[I]->NumberValue());


#define REQ_EXT_ARG(I, VAR)                                             \
	CHECK_REQ_ARG(I, IsExternal(), "void*");                            \
	Local<External> VAR = Local<External>::Cast(info[I]);


#define REQ_FUN_ARG(I, VAR)                                             \
	CHECK_REQ_ARG(I, IsFunction(), "function");                         \
	Local<Function> VAR = Local<Function>::Cast(info[I]);


#define REQ_OBJ_ARG(I, VAR)                                             \
	CHECK_REQ_ARG(I, IsObject(), "object");                             \
	Local<Object> VAR = Local<Object>::Cast(info[I]);


#define REQ_ARRV_ARG(I, VAR)                                            \
	REQ_OBJ_ARG(I, _obj_##VAR);                                         \
	if( ! _obj_##VAR->IsArrayBufferView() )                             \
		Nan::ThrowTypeError("Argument " #I " must be an array buffer"); \
	Local<ArrayBufferView> VAR = Local<ArrayBufferView>::Cast(_obj_##VAR);


#define SET_PROP(OBJ, KEY, VAL) OBJ->Set(JS_STR(KEY), VAL);


#endif // _ADDON_TOOLS_HPP_
