# Es5 class wrapping

## Class Declaration

```
class ClassName {
DECLARE_ES5_CLASS(ClassName, JSClassName);
	
public:
	static void init(Napi::Env env, Napi::Object exports);
	explicit ClassName(const Napi::CallbackInfo& info);
	~ClassName();
	
	void _destroy();
	
 private:
	JS_DECLARE_GETTER(ClassName, isDestroyed);
	
	JS_DECLARE_METHOD(ClassName, ClassName, destroy);
	
	bool _isDestroyed;
	
};
```

`DECLARE_ES5_CLASS` - adds utility declarations, the first argument
must be this class name, and the second argument will become the
name (arbitrary) of this function (constructor) in JS.

`init` - can be used to initialize this class and export it.

`JS_DECLARE_METHOD` - declares a method, the first argument is this class,
the second is the name of the method to be created.
`JS_DECLARE_GETTER` - declares a getter, the first argument is this class,
the second is the name of the getter to be created.
`JS_DECLARE_SETTER` - declares a setter, the first argument is this class,
the second is the name of the setter to be created.


## Class Implementation

```
IMPLEMENT_ES5_CLASS(ClassName);
void ClassName::init(Napi::Env env, Napi::Object exports) {
	
	Napi::Function ctor = wrap(env);
	
	JS_ASSIGN_METHOD(destroy);
	
	JS_ASSIGN_GETTER(isDestroyed);
	
	exports.Set("JSClassName", ctor);
	
}

Body::Body(const Napi::CallbackInfo &info) { NAPI_ENV;
	
	super(info);
	
	_isDestroyed = false;
	
	// ...
	
}

Body::~Body() {
	_destroy();
}


void Body::_destroy() { DES_CHECK;
	_isDestroyed = true;
}



```
