import nextConnect from "next-connect";
import LRU from "lru-cache";
import _isNil from "lodash/isNil";

const context = {
  cache: new LRU({
    max: parseInt(process.env.CACHE_MAX_SIZE),
    maxAge: parseInt(process.env.CACHE_MAX_AGE_IN_S) * 1000,
  }),
};

async function returnCachedResult(req, res, next) {
  const cacheKey = encodeURIComponent(req.url);

  // Return the cached result if it exists
  if (!_isNil(context.cache) && context.cache.has(cacheKey)) {
    const { birth, data } = context.cache.get(cacheKey);

    res.setHeader("X-Cache", "HIT");
    res.setHeader("X-Cache-Age-s", Math.floor((Date.now() - birth) / 1000));
    return res.json(data);
  }

  return next();
}

async function cacheResultAndReturn(req, res, next) {
  const cacheKey = encodeURIComponent(req.url);

  // Set cache
  context.cache.set(cacheKey, { data: req.outputData, birth: Date.now() });

  res.setHeader("X-Cache", "SET");
  res.status(200).json(req.outputData);
}

const returnCache = nextConnect();
returnCache.use(returnCachedResult);

const cacheResult = nextConnect();
cacheResult.use(cacheResultAndReturn);

export { returnCache, cacheResult };
