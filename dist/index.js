/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "0d9fa9c95a1c77acfeb5";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.ts")(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_webpack@4.30.0@webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/_webpack@4.30.0@webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./src/Core/EventTest.ts":
/*!*******************************!*\
  !*** ./src/Core/EventTest.ts ***!
  \*******************************/
/*! exports provided: EventTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventTest\", function() { return EventTest; });\n/* harmony import */ var _events_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events/Event */ \"./src/Core/events/Event.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar EventTest = /** @class */ (function (_super) {\r\n    __extends(EventTest, _super);\r\n    function EventTest() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    EventTest.test = 'test';\r\n    return EventTest;\r\n}(_events_Event__WEBPACK_IMPORTED_MODULE_0__[\"Event\"]));\r\n\r\n\n\n//# sourceURL=webpack:///./src/Core/EventTest.ts?");

/***/ }),

/***/ "./src/Core/events/Event.ts":
/*!**********************************!*\
  !*** ./src/Core/events/Event.ts ***!
  \**********************************/
/*! exports provided: Event, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Event\", function() { return Event; });\n/* harmony import */ var _HashObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HashObject */ \"./src/Core/events/HashObject.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n/** 默认事件的优先级标识 */\r\nvar DEFAULT_PRIORITY_LEVEL = 0;\r\n/**\r\n * Event 类作为创建事件实例的基类\r\n *\r\n * @class Event\r\n * @extends {HashObject}\r\n */\r\nvar Event = /** @class */ (function (_super) {\r\n    __extends(Event, _super);\r\n    function Event(type, bubbles, cancelable, data) {\r\n        var _this = _super.call(this) || this;\r\n        /**\r\n         * 触发事件的对象.\r\n         *\r\n         * @private\r\n         * @type {*}\r\n         * @memberof Event\r\n         */\r\n        _this.$currentTarget = null;\r\n        /**\r\n         * 是否阻止默认事件.\r\n         *\r\n         * @private\r\n         * @type {boolean}\r\n         * @memberof Event\r\n         */\r\n        _this.$isDefaultPrevented = false;\r\n        /**\r\n         * 事件流中的当前阶段。\r\n         *\r\n         * @private\r\n         * @type {number}\r\n         * @memberof Event\r\n         */\r\n        _this.$eventPhase = 2 /* AT_TARGET */;\r\n        /**\r\n         * 事件要操作的对象.\r\n         *\r\n         * @private\r\n         * @type {*}\r\n         * @memberof Event\r\n         */\r\n        _this.$target = null;\r\n        _this.init(type, bubbles, cancelable, data);\r\n        return _this;\r\n    }\r\n    Event.prototype.init = function (type, bubbles, cancelable, data) {\r\n        this.$type = type;\r\n        this.$bubbles = !!bubbles;\r\n        this.$cancelable = !!cancelable;\r\n        this.data = data;\r\n    };\r\n    Event.create = function (EventClass, type, bubbles, cancelable) {\r\n        var eventPool;\r\n        var hasEventPool = EventClass.hasOwnProperty(\"eventPool\");\r\n        if (hasEventPool) {\r\n            eventPool = EventClass.eventPool;\r\n        }\r\n        else { // 第一个绑定的事件处理\r\n            // Notice: 第一个事件监听添加时，eventPool还不存在隐藏需要创建一个空数组作为事件对象(或者叫做事件池)\r\n            eventPool = EventClass.eventPool = [];\r\n        }\r\n        // Notice: 上面采取了 else 方式，避免 ts(2454) 报错.\r\n        // if (!eventPool) {\r\n        //   console.log('not have eventPoll');\r\n        //   eventPool = EventClass.eventPool = [];\r\n        // }\r\n        if (eventPool.length) {\r\n            var event_1 = eventPool.pop();\r\n            event_1.$type = type;\r\n            event_1.$bubbles = !!bubbles;\r\n            event_1.$cancelable = !!cancelable;\r\n            event_1.$isDefaultPrevented = false;\r\n            event_1.$eventPhase = 2 /* AT_TARGET */;\r\n            return event_1;\r\n        }\r\n        return new EventClass(type, bubbles, cancelable);\r\n    };\r\n    Event.getPropertyData = function (EventClass) {\r\n        var props = EventClass._props;\r\n        if (!props) {\r\n            props = EventClass._props = {};\r\n        }\r\n        return props;\r\n    };\r\n    /**\r\n     * 派发指定的事件.\r\n     *\r\n     * @static\r\n     * @param {IEventDispatcher} target\r\n     * @param {string} type\r\n     * @param {boolean} [bubbles=false]\r\n     * @param {*} [data]\r\n     * @returns\r\n     * @memberof Event\r\n     */\r\n    Event.dispatchEvent = function (target, type, bubbles, data) {\r\n        if (bubbles === void 0) { bubbles = false; }\r\n        var event = Event.create(Event, type, bubbles);\r\n        var props = Event.getPropertyData(Event);\r\n        if (data != undefined) {\r\n            props.data = data;\r\n        }\r\n        var result = target.dispatchEvent(event);\r\n        Event.release(event);\r\n        return result;\r\n    };\r\n    /**\r\n     * 释放一个事件.\r\n     *\r\n     * @static\r\n     * @param {Event} event\r\n     * @memberof Event\r\n     */\r\n    Event.release = function (event) {\r\n        event.clean();\r\n        var EventClass = Object.getPrototypeOf(event).constructor;\r\n        EventClass.eventPool.push(event);\r\n    };\r\n    Object.defineProperty(Event.prototype, \"type\", {\r\n        /**\r\n         * 返回事件的类型.\r\n         *\r\n         * @readonly\r\n         * @type {string}\r\n         * @memberof Event\r\n         */\r\n        get: function () {\r\n            return this.$type;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Event.prototype, \"bubbles\", {\r\n        get: function () {\r\n            return this.$bubbles;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Event.prototype, \"currentTarget\", {\r\n        get: function () {\r\n            return this.$currentTarget;\r\n        },\r\n        set: function (value) {\r\n            this.$currentTarget = value;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Event.prototype, \"isDefaultPrevented\", {\r\n        get: function () {\r\n            return this.$isDefaultPrevented;\r\n        },\r\n        set: function (value) {\r\n            this.$isDefaultPrevented = value;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Event.prototype, \"eventPhase\", {\r\n        get: function () {\r\n            return this.$eventPhase;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Event.prototype.clean = function () {\r\n        this.data = this.$currentTarget = null;\r\n        this.setTarget(null);\r\n    };\r\n    Event.prototype.$setTarget = function (target) {\r\n        this.$target = target;\r\n        return true;\r\n    };\r\n    Event.prototype.setTarget = function (target) {\r\n        this.$target = target;\r\n        return true;\r\n    };\r\n    // 静态方法和属性 start ===============================================\r\n    Event.TEST = 'TEST';\r\n    /** 默认事件的优先级标识 */\r\n    Event.DEFAULT_PRIORITY_LEVEL = DEFAULT_PRIORITY_LEVEL;\r\n    return Event;\r\n}(_HashObject__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Event);\r\n\n\n//# sourceURL=webpack:///./src/Core/events/Event.ts?");

/***/ }),

/***/ "./src/Core/events/EventDispatcher.ts":
/*!********************************************!*\
  !*** ./src/Core/events/EventDispatcher.ts ***!
  \********************************************/
/*! exports provided: EventDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventDispatcher\", function() { return EventDispatcher; });\n/* harmony import */ var _HashObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HashObject */ \"./src/Core/events/HashObject.ts\");\n/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event */ \"./src/Core/events/Event.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\nvar ONCE_EVENT_LIST = [];\r\n/**\r\n * 事件派发类.\r\n */\r\nvar EventDispatcher = /** @class */ (function (_super) {\r\n    __extends(EventDispatcher, _super);\r\n    function EventDispatcher(target) {\r\n        if (target === void 0) { target = null; }\r\n        var _this = _super.call(this) || this;\r\n        _this.init(target);\r\n        return _this;\r\n    }\r\n    EventDispatcher.prototype.init = function (target) {\r\n        this.$EventDispatcher = {\r\n            0: target ? target : this,\r\n            1: {},\r\n            2: {},\r\n            3: 0\r\n        };\r\n    };\r\n    EventDispatcher.prototype.$addListener = function (type, listener, thisObject, useCapture, priority, dispatchOnce) {\r\n        var values = this.$EventDispatcher;\r\n        var eventMap = useCapture\r\n            ? values[2 /* captureEventsMap */]\r\n            : values[1 /* eventsMap */];\r\n        var list = eventMap[type];\r\n        if (!list) {\r\n            list = eventMap[type] = [];\r\n        }\r\n        else if (values[3 /* notifyLevel */] !== 0) {\r\n            eventMap[type] = list = list.concat();\r\n        }\r\n        this.$insertEventBin(list, type, listener, thisObject, useCapture, priority, dispatchOnce);\r\n    };\r\n    /**\r\n     * 添加事件监听.\r\n     *\r\n     * @param {string} type\r\n     * @param {Function} listener\r\n     * @param {*} thisObject\r\n     * @param {boolean} [useCapture]\r\n     * @param {number} [priority]\r\n     * @memberof EventDispatcher\r\n     */\r\n    EventDispatcher.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority, dispatchOnce) {\r\n        this.$addListener(type, listener, thisObject, useCapture, priority);\r\n    };\r\n    EventDispatcher.prototype.once = function (type, listener, thisObject, useCapture, priority) {\r\n        this.$addListener(type, listener, thisObject, useCapture, priority, true);\r\n    };\r\n    EventDispatcher.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {\r\n        var values = this.$EventDispatcher;\r\n        var eventMap = useCapture ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];\r\n        var list = eventMap[type];\r\n        if (!list) {\r\n            return;\r\n        }\r\n        if (values[3 /* notifyLevel */] !== 0) {\r\n            eventMap[type] = list = list.concat();\r\n        }\r\n        this.$removeEventBin(list, listener, thisObject);\r\n        if (list.length == 0) {\r\n            eventMap[type] = null;\r\n        }\r\n    };\r\n    EventDispatcher.prototype.hasEventListener = function (type) {\r\n        var values = this.$EventDispatcher;\r\n        return !!(values[1 /* eventsMap */][type] || values[2 /* captureEventsMap */][type]);\r\n    };\r\n    EventDispatcher.prototype.dispatchEvent = function (event) {\r\n        event.currentTarget = this.$EventDispatcher[0 /* eventTarget */];\r\n        event.setTarget(event.currentTarget);\r\n        return this.notifyListener(event, false);\r\n    };\r\n    /**\r\n     * 派发一个事件，字符串方式派发，可以传递参数.\r\n     *\r\n     * @param {string} string\r\n     * @param {boolean} [bubbles]\r\n     * @param {*} [data]\r\n     * @param {boolean} [cancelable]\r\n     * @memberof EventDispatcher\r\n     */\r\n    EventDispatcher.prototype.dispatchEventWith = function (type, bubbles, data, cancelable) {\r\n        if (bubbles || this.hasEventListener(type)) {\r\n            var event_1 = _Event__WEBPACK_IMPORTED_MODULE_1__[\"Event\"].create(_Event__WEBPACK_IMPORTED_MODULE_1__[\"Event\"], type, bubbles, cancelable);\r\n            event_1.data = data;\r\n            var result = this.dispatchEvent(event_1);\r\n            _Event__WEBPACK_IMPORTED_MODULE_1__[\"Event\"].release(event_1);\r\n            return result;\r\n        }\r\n        return true;\r\n    };\r\n    EventDispatcher.prototype.notifyListener = function (event, capturePhase) {\r\n        var values = this.$EventDispatcher;\r\n        var eventMap = capturePhase\r\n            ? values[2 /* captureEventsMap */]\r\n            : values[1 /* eventsMap */];\r\n        var list = eventMap[event.type];\r\n        if (!list) {\r\n            return true;\r\n        }\r\n        var length = list.length;\r\n        if (length == 0) {\r\n            return true;\r\n        }\r\n        var onceList = ONCE_EVENT_LIST;\r\n        values[3 /* notifyLevel */]++;\r\n        for (var i = 0; i < length; i++) {\r\n            var eventBin = list[i];\r\n            eventBin.listener.call(eventBin.thisObject, event);\r\n            if (eventBin.dispatchOnce) {\r\n                onceList.push(eventBin);\r\n            }\r\n            // TODO: event.$isPropagationImmediateStopped\r\n        }\r\n        values[3 /* notifyLevel */]--;\r\n        while (onceList.length) {\r\n            var eventBin = onceList.pop();\r\n            eventBin.target.removeEventListener(eventBin.type, eventBin.listener, eventBin.thisObject, eventBin.useCapture);\r\n        }\r\n        return !event.isDefaultPrevented;\r\n    };\r\n    /**\r\n     * 添加到事件队列中.\r\n     *\r\n     * @private\r\n     * @param {any[]} list\r\n     * @param {string} type\r\n     * @param {Function} listener\r\n     * @param {*} thisObject\r\n     * @param {boolean} [useCapture]\r\n     * @param {number} [priority] 优先级\r\n     * @param {boolean} [dispatchOnce]\r\n     * @returns {boolean}\r\n     * @memberof EventDispatcher\r\n     */\r\n    EventDispatcher.prototype.$insertEventBin = function (list, type, listener, thisObject, useCapture, priority, dispatchOnce) {\r\n        // Notice: 这是什么操作 ？\r\n        // + 可用于将变量转换为数字\r\n        // priority = +priority | 0;\r\n        // + priority 并不能保证 priority一定为数字，不是数字为0, 下面是可读性修改\r\n        if (!priority)\r\n            priority = 0;\r\n        var length = list.length;\r\n        var insertIndex = -1;\r\n        for (var i = 0; i < length; i++) {\r\n            var bin = list[i];\r\n            if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {\r\n                return false;\r\n            }\r\n            if (insertIndex == -1 && bin.priority < priority) {\r\n                insertIndex = i;\r\n            }\r\n        }\r\n        var eventBin = {\r\n            type: type,\r\n            listener: listener,\r\n            thisObject: thisObject,\r\n            priority: priority,\r\n            target: this,\r\n            useCapture: !!useCapture,\r\n            dispatchOnce: !!dispatchOnce\r\n        };\r\n        if (insertIndex !== -1) {\r\n            list.splice(insertIndex, 0, eventBin);\r\n        }\r\n        else {\r\n            list.push(eventBin);\r\n        }\r\n        return true;\r\n    };\r\n    /**\r\n     * 从队列中移除指定的事件.\r\n     *\r\n     * @private\r\n     * @param {IEventBin[]} list\r\n     * @param {Function} listener\r\n     * @param {*} thisObject\r\n     * @returns {boolean}\r\n     * @memberof EventDispatcher\r\n     */\r\n    EventDispatcher.prototype.$removeEventBin = function (list, listener, thisObject) {\r\n        var length = list.length;\r\n        for (var i = 0; i < length; i++) {\r\n            var bin = list[i];\r\n            if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {\r\n                list.splice(i, 1);\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    };\r\n    return EventDispatcher;\r\n}(_HashObject__WEBPACK_IMPORTED_MODULE_0__[\"HashObject\"]));\r\n\r\n\n\n//# sourceURL=webpack:///./src/Core/events/EventDispatcher.ts?");

/***/ }),

/***/ "./src/Core/events/EventX.ts":
/*!***********************************!*\
  !*** ./src/Core/events/EventX.ts ***!
  \***********************************/
/*! exports provided: EventX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventX\", function() { return EventX; });\n/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event */ \"./src/Core/events/Event.ts\");\n/* harmony import */ var _EventDispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventDispatcher */ \"./src/Core/events/EventDispatcher.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\n/**\r\n * 通用事件监听派发类.\r\n *\r\n * @desc EventDispatcher 虽然也可以做事件的监听和派发，但是.js时 dispatchEvent(event: Event)功能实现, 这里添加了一个兼容类，并添加快捷方式.\r\n */\r\nvar EventX = /** @class */ (function (_super) {\r\n    __extends(EventX, _super);\r\n    function EventX() {\r\n        return _super.call(this) || this;\r\n    }\r\n    EventX.prototype.on = function (type, listener, thisObj, options) {\r\n        // let { useCapture, priority, dispatchOnce} as IEventOptions = options;\r\n        var useCapture = (options && options.useCapture) || false;\r\n        var priority = (options && options.priority) || _Event__WEBPACK_IMPORTED_MODULE_0__[\"Event\"].DEFAULT_PRIORITY_LEVEL;\r\n        var dispatchOnce = (options && options.dispatchOnce) || false;\r\n        _super.prototype.addEventListener.call(this, type, listener, thisObj, useCapture, priority, dispatchOnce);\r\n    };\r\n    EventX.prototype.off = function (type, listener, thisObj, useCapture) {\r\n        if (useCapture === void 0) { useCapture = false; }\r\n        _super.prototype.removeEventListener.call(this, type, listener, thisObj, useCapture);\r\n    };\r\n    EventX.prototype.trigger = function (type, data) {\r\n        if (data === void 0) { data = {}; }\r\n        /** 不冒泡 */\r\n        var bubbles = false;\r\n        _super.prototype.dispatchEventWith.call(this, type, bubbles, data);\r\n    };\r\n    return EventX;\r\n}(_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__[\"EventDispatcher\"]));\r\n\r\n\n\n//# sourceURL=webpack:///./src/Core/events/EventX.ts?");

/***/ }),

/***/ "./src/Core/events/HashObject.ts":
/*!***************************************!*\
  !*** ./src/Core/events/HashObject.ts ***!
  \***************************************/
/*! exports provided: $hashCount, HashObject, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$hashCount\", function() { return $hashCount; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HashObject\", function() { return HashObject; });\n/**\r\n * @private\r\n * 哈希计数\r\n */\r\nvar $hashCount = 1;\r\n/**\r\n * 顶级对象。框架内所有对象的基类，为对象实例提供唯一的hashCode值。\r\n */\r\nvar HashObject = /** @class */ (function () {\r\n    function HashObject() {\r\n        this.$hashCode = $hashCount++;\r\n    }\r\n    Object.defineProperty(HashObject.prototype, \"hashCode\", {\r\n        /**\r\n         * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。\r\n         *\r\n         * @readonly\r\n         * @type {number}\r\n         * @memberof HashObject\r\n         */\r\n        get: function () {\r\n            return this.$hashCode;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return HashObject;\r\n}());\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (HashObject);\r\n\n\n//# sourceURL=webpack:///./src/Core/events/HashObject.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _Core_events_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Core/events/Event */ \"./src/Core/events/Event.ts\");\n/* harmony import */ var _Core_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Core/events/EventDispatcher */ \"./src/Core/events/EventDispatcher.ts\");\n/* harmony import */ var _Core_EventTest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Core/EventTest */ \"./src/Core/EventTest.ts\");\n/* harmony import */ var _Core_events_EventX__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Core/events/EventX */ \"./src/Core/events/EventX.ts\");\n\r\n\r\n\r\n\r\n/**\r\n * 常用工具合集.\r\n */\r\nvar jsUtilsHelper = {\r\n    /** 事件类型类 */\r\n    EventTest: _Core_EventTest__WEBPACK_IMPORTED_MODULE_2__[\"EventTest\"],\r\n    /** 事件类 */\r\n    Event: _Core_events_Event__WEBPACK_IMPORTED_MODULE_0__[\"Event\"],\r\n    /**\r\n     * 事件监听派发类.\r\n     */\r\n    EventDispatcher: _Core_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__[\"EventDispatcher\"],\r\n    /** 通用事件监听派发类 */\r\n    EventX: _Core_events_EventX__WEBPACK_IMPORTED_MODULE_3__[\"EventX\"]\r\n};\r\n// 打包处理 start ====================\r\n!(function webpackUniversalModuleDefinition(root, factory) {\r\n    if (typeof exports === 'object' && typeof module === 'object')\r\n        module.exports = factory();\r\n    else if (typeof exports === 'object')\r\n        exports[\"jsUtilsHelper\"] = factory();\r\n    else\r\n        root[\"jsUtilsHelper\"] = factory();\r\n})(global, function () {\r\n    return jsUtilsHelper;\r\n});\r\n// 打包处理 end ====================\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (jsUtilsHelper);\r\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/_webpack@4.30.0@webpack/buildin/global.js */ \"./node_modules/_webpack@4.30.0@webpack/buildin/global.js\"), __webpack_require__(/*! ./../node_modules/_webpack@4.30.0@webpack/buildin/harmony-module.js */ \"./node_modules/_webpack@4.30.0@webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });