# Es5 class wrapping

This wrapping implementation diverges from standard ES6 style wrapping.
It also uses composition rather than inheritance, so it is easily pluggable.

* For **NAPI** addons, `super()` can be called from C++ side.
* Constructor is callable with `ClassName.call(obj, ...args)`.
* Multiple C++ objects can be attached to a single JS object
if it is necessary in an inheritance scenario.
* On JS side `util.inherits`
[is used](https://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor),
and on C++ side there is `inheritEs5` function.


## Class Declaration

```cpp
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

* `DECLARE_ES5_CLASS` - adds utility declarations, the first argument
must be this class name, and the second argument will become the
name (arbitrary) of this function (constructor) in JS.
* `init` - can be used to initialize this class and export it.
* `JS_DECLARE_METHOD` - declares a method, the first argument is this class,
the second is the name of the method to be created.
* `JS_DECLARE_GETTER` - declares a getter, the first argument is this class,
the second is the name of the getter to be created.
* `JS_DECLARE_SETTER` - declares a setter, the first argument is this class,
the second is the name of the setter to be created.


## Class Implementation

```cpp
IMPLEMENT_ES5_CLASS(ClassName);

// Fill the properties and export the class
void ClassName::init(Napi::Env env, Napi::Object exports) {
	Napi::Function ctor = wrap(env);
	JS_ASSIGN_METHOD(destroy);
	JS_ASSIGN_GETTER(isDestroyed);
	// ...
	exports.Set("JSClassName", ctor);
}

ClassName::ClassName(const Napi::CallbackInfo &info) { NAPI_ENV;
	super(info);
	_isDestroyed = false;
	
	// ...
}

ClassName::~ClassName() {
	_destroy();
}

void ClassName::_destroy() { DES_CHECK;
	// ...
	_isDestroyed = true;
}


JS_IMPLEMENT_METHOD(ClassName, destroy) { THIS_CHECK;
	emit("destroy");
	_destroy();
	RET_UNDEFINED;
}


JS_IMPLEMENT_GETTER(ClassName, isDestroyed) { THIS_CHECK;
	RET_BOOL(_isDestroyed);
}

```

* `IMPLEMENT_ES5_CLASS` - implements some utility functions for class wrapping.
* `JS_ASSIGN_METHOD` - in `init()`, assigns the given method to this class.
* `JS_ASSIGN_GETTER` - in `init()`, assigns the given getter to this class.
* `JS_ASSIGN_SETTER` - in `init()`, assigns both getter and setter to this class.
It also takes only one argument because both have the same name.
* `JS_IMPLEMENT_METHOD` - implements a method, the first argument is this class,
the second is the name of the method being implemented.
* `JS_IMPLEMENT_GETTER` - implements a getter, the first argument is this class,
the second is the name of the getter being implemented.
* `JS_IMPLEMENT_SETTER` - implements a setter, the first argument is this class,
the second is the name of the setter being implemented.
