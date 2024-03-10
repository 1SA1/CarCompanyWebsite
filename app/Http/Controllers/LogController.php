<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;

class LogController extends Controller
{
    public function index()
    {
        $logs = Log::all();
        return response()->json($logs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'action' => 'required',
            'description' => 'required',
        ]);

        $log = Log::create($request->all());

        return response()->json($log, 201);
    }

    public function show($id)
    {
        $log = Log::findOrFail($id);
        return response()->json($log);
    }

    public function update(Request $request, $id)
    {
        $log = Log::findOrFail($id);

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'action' => 'required',
            'description' => 'required',
        ]);

        $log->update($request->all());

        return response()->json($log, 200);
    }

    public function destroy($id)
    {
        $log = Log::findOrFail($id);
        $log->delete();

        return response()->json(null, 204);
    }
}
