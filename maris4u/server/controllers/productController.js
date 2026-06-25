exports.getAll = async (req,res)=>{ res.json({ products: [] }) }
exports.getOne = async (req,res)=>{ res.json({ product: null }) }
exports.create = async (req,res)=>{ res.json({ created: true }) }
exports.update = async (req,res)=>{ res.json({ updated: true }) }
exports.delete = async (req,res)=>{ res.json({ deleted: true }) }
