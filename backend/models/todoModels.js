const mongoose= require('mongoose')


Schema= mongoose.Schema;

todoSchema= new Schema(
    {
        title:
        {
          type:String,
          required:true
        },

        task:
        {
            type: String,
            required: true
        },
        date:
        {
            type: String,
            required :true 
        }
    }, {
        timestamps:true
    }
    )
    module.exports = mongoose.model("Todo",todoSchema)
