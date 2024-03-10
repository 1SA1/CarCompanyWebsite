<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\CarPhoto;
use App\Models\Log;
use Illuminate\Support\Facades\Auth;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::all();
        return response()->json($cars);
    }

    public function store(Request $request)
    {
        try {
            
            // Validate request data
            $validatedData = $request->validate([
                'make' => 'required|string|max:255',
                'model' => 'required|string|max:255',
                'year' => 'required|integer|min:1900|max:' . date('Y'),
                'price' => 'required|numeric|min:0',
                'images' => 'required|array',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            ]);
    
            // Create car record
            $car = Car::create([
                'make' => $validatedData['make'],
                'model' => $validatedData['model'],
                'year' => $validatedData['year'],
                'price' => $validatedData['price'],
            ]);

    

           // Handle image uploads
           if ($request->hasFile('images')) {
               foreach ($request->file('images') as $image) {
                
                   // Store each image in the storage folder
                   $path = $image->store('car_photos', 'public');


   
                   // Create a record in the car_photos table for each image
                   CarPhoto::create([
                       'car_id' => $car->id,
                       'url' => $path,
                   ]);
               }
           }

       
            Log::create([
                'user_id' => Auth::id(),
                'action' => 'Added a new car: '.$car->make,
            ]);
        

    
            return response()->json(['message' => 'Car created successfully', 'car' => $car], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Validation failed, return validation error messages
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Other exceptions, return internal server error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function destroy($id)
    {
        $car = Car::findOrFail($id);
        $car->delete();
      
        return response()->json(['message' => 'Car deleted successfully']);
    }

    public function update(Request $request, $id)
    {
        try {
            // Find the car by ID
            $car = Car::findOrFail($id);
    
            // Validate request data
            $validatedData = $request->validate([
                'make' => 'required|string|max:255',
                'model' => 'required|string|max:255',
                'year' => 'required|integer|min:1900|max:' . date('Y'),
                'price' => 'required|numeric|min:0',
                
            ]);
    
            // Update car attributes
            $car->update($validatedData);

           
    
            return response()->json(['message' => 'Car updated successfully', 'car' => $car], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Validation failed, return validation error messages
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Other exceptions, return internal server error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function displayCars()
    {
        // Fetch all cars with their images
        $cars = Car::with('photos')->get();

        return response()->json($cars);
    }
    
}
