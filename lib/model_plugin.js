module.exports = exports = function lastModifiedPlugin(schema) {
  
  schema.add({ createdAt: {type: Date}});
  schema.add({ updatedAt: {type: Date}});
  
  schema.pre('save', function (next){
    this.updatedAt =  new Date();
    if ( !this.createdAt ) {
      this.createdAt =  new Date();
    }
    next();
  });

};

