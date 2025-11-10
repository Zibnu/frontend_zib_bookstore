import React from 'react'

function StatCard({title, value, icon : Icon}) {
  return (
    <div className='flex items-center gap-5 p-6 rounded-2xl shadow-sm bg-white border border-gray-200 hover:shadow-md hover:border-gray-400'>
      {Icon && (
        <div className="text-2xl text-gray-400">
          <Icon size={30}/>
        </div>
      )}
      <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-semibold mt-2">{value}</h2>
      </div>
    </div>
  )
}

export default StatCard