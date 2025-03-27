import React, { useState, useEffect } from 'react';
import { CircleHelpIcon,  ChevronRight,HeartIcon, BookOpenIcon, Cookie, RotateCcw, Home, Calendar, Bell, Settings, Info, Star, Search, X, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';

const Remedies = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const [selectedCategory, setSelectedCategory] = useState('menstrual');
  const [fortuneCookie, setFortuneCookie] = useState({ message: '', opened: false });
  const [fortuneAnimation, setFortuneAnimation] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const healthCategories = [
    { id: 'menstrual', name: 'Menstrual Cramps', icon: '🌸' },
    { id: 'pcos', name: 'PCOS Symptoms', icon: '🔄' },
    { id: 'uti', name: 'UTI Relief', icon: '🚿' },
    { id: 'hormonal', name: 'Hormonal Balance', icon: '⚖️' },
    { id: 'pregnancy', name: 'Pregnancy Nausea', icon: '🤰' },
    { id: 'anxiety', name: 'Anxiety & Stress', icon: '🧘‍♀️' },
  ];

  const remedyRecipes = {
    menstrual: [
      {
        id: 'menstrual-1',
        title: "Ginger & Cinnamon Tea",
        ingredients: ["1 inch fresh ginger, sliced", "1 cinnamon stick", "1 cup water", "1 tsp honey (optional)"],
        instructions: "Boil ginger and cinnamon in water for 5-7 minutes. Strain and add honey if desired.",
        prepTime: "10 minutes",
        benefits: "Reduces inflammation and muscle spasms, improves blood flow to the uterus."
      },
      {
        id: 'menstrual-2',
        title: "Warm Fennel Seed Compress",
        ingredients: ["2 tbsp fennel seeds", "2 cups hot water", "Clean cloth"],
        instructions: "Steep fennel seeds in hot water for 10 minutes. Soak the cloth in mixture, wring out excess, and apply to lower abdomen.",
        prepTime: "15 minutes",
        benefits: "Relieves cramping through muscle relaxation and anti-inflammatory properties."
      },

        {
          id: "menstrual-3",
          title: "Ajwain & Jaggery Tea",
          ingredients: ["1 tsp ajwain (carom seeds)", "1 small piece jaggery", "1 cup water"],
          instructions: "Boil ajwain in water for 5 minutes. Add jaggery and stir until dissolved. Drink warm.",
          prepTime: "10 minutes",
          benefits: "Eases menstrual cramps, promotes digestion, and regulates blood flow."
        },
        {
          id: "menstrual-4",
          title: "Turmeric Milk",
          ingredients: ["1/2 tsp turmeric powder", "1 cup warm milk", "1/2 tsp honey (optional)"],
          instructions: "Mix turmeric into warm milk. Add honey for taste if desired. Drink before bed.",
          prepTime: "5 minutes",
          benefits: "Anti-inflammatory, reduces cramps, and balances hormones."
        },
        {
          id: "menstrual-5",
          title: "Cumin Seed Water",
          ingredients: ["1 tsp cumin seeds", "1 cup water"],
          instructions: "Soak cumin seeds overnight or boil in water for 5 minutes. Strain and drink warm.",
          prepTime: "5 minutes (plus soaking time if applicable)",
          benefits: "Relieves bloating, reduces pain, and supports digestion."
        },
        {
          id: "menstrual-6",
          title: "Holy Basil (Tulsi) Tea",
          ingredients: ["5-6 fresh tulsi leaves", "1 cup water", "1 tsp honey (optional)"],
          instructions: "Boil tulsi leaves in water for 5 minutes. Strain and add honey if desired.",
         prepTime: "10 minutes",
          benefits: "Reduces stress, regulates menstrual cycle, and relieves cramps."
        }
    ],
    pcos: [
      {
        id: 'pcos-1',
        title: "Cinnamon & Flaxseed Smoothie",
        ingredients: ["1 tbsp ground flaxseeds", "1/2 tsp cinnamon", "1 cup almond milk", "1/2 banana", "Ice cubes"],
        instructions: "Blend all ingredients until smooth. Drink once daily.",
        prepTime: "5 minutes",
        benefits: "May help regulate insulin and reduce testosterone levels."
      },
      {
        id: 'pcos-2',
        title: "Spearmint Tea Infusion",
        ingredients: ["2 tsp dried spearmint leaves", "1 cup hot water", "Lemon slice (optional)"],
        instructions: "Steep spearmint in hot water for 5-7 minutes. Strain and add lemon if desired.",
        prepTime: "8 minutes",
        benefits: "Research suggests it may reduce excess androgens (male hormones)."
      },
      {
        id: 'pcos-3',
        title: 'Fenugreek Water',
        ingredients: ["1 tsp fenugreek seeds", "1 cup water", "1/2 tsp honey (optional)"],
        instructions: "Soak fenugreek seeds overnight. Drink the infused water on an empty stomach.",
        prepTime: "5 minutes (plus overnight soaking)",
        benefits: "May help regulate blood sugar and improve insulin sensitivity."
      },
      {
        id: 'pcos-4',
        title: 'Turmeric & Ashwagandha Latte',
        ingredients: ["1/2 tsp turmeric powder", "1/4 tsp ashwagandha powder", "1 cup warm coconut milk", "1/2 tsp honey (optional)"],
        instructions: "Mix turmeric and ashwagandha into warm milk. Stir well and drink before bed.",
        prepTime: "5 minutes",
        benefits: "Supports hormonal balance, reduces stress, and has anti-inflammatory properties."
      },
      {
        id: 'pcos-5',
        title: 'Amla & Aloe Vera Juice',
        ingredients: ["2 tbsp fresh amla (Indian gooseberry) juice", "1 tbsp aloe vera juice", "1/2 cup water"],
        instructions: "Mix all ingredients well. Drink fresh in the morning on an empty stomach.",
        prepTime: "5 minutes",
        benefits: "Rich in antioxidants, supports liver health, and aids in hormonal balance."
      },
      {
        id: 'pcos-6',
        title: 'Methi & Cinnamon Detox Water',
        ingredients: ["1 tsp fenugreek seeds", "1/2 tsp cinnamon powder", "1 cup warm water"],
        instructions: "Soak fenugreek seeds overnight, then add cinnamon powder before drinking.",
        prepTime: "5 minutes (plus overnight soaking)",
        benefits: "May help improve metabolism, regulate blood sugar, and support ovulation."
      }
    ],
    uti: [
      {
        id: 'uti-1',
        title: "Cranberry Anti-Inflammatory Elixir",
        ingredients: ["1 cup unsweetened cranberry juice", "1 cup water", "1 tbsp apple cider vinegar", "1 tsp honey"],
        instructions: "Mix all ingredients well. Drink 3 times daily until symptoms improve.",
        prepTime: "3 minutes",
        benefits: "Cranberries help prevent bacteria from adhering to the urinary tract walls."
      },
      {
        id: 'uti-2',
        title: "Cooling Cucumber Water",
        ingredients: ["1/2 cucumber, sliced", "2 liters water", "Fresh mint leaves"],
        instructions: "Combine ingredients in a pitcher and refrigerate for at least 2 hours. Drink throughout the day.",
        prepTime: "5 minutes + 2 hours cooling",
        benefits: "Promotes hydration and gentle diuretic effect to flush bacteria."
      },
      {
        id: 'uti-3',
        title: 'Barley Water Flush',
        ingredients: ["1/4 cup barley", "4 cups water", "1/2 tsp lemon juice (optional)"],
        instructions: "Boil barley in water for 15-20 minutes. Strain and drink warm or cool with lemon juice.",
        prepTime: "20 minutes",
        benefits: "Acts as a natural diuretic, flushing out toxins and bacteria from the urinary tract."
      },
      {
        id: 'uti-4',
        title: 'Coconut Water Hydration',
        ingredients: ["1 cup fresh coconut water"],
        instructions: "Drink fresh coconut water daily for hydration and bladder health.",
        prepTime: "2 minutes",
        benefits: "Natural antimicrobial properties that may help fight UTI-causing bacteria."
      },
      {
        id: 'uti-5',
        title: 'Tulsi & Coriander Detox Drink',
        ingredients: ["5-6 fresh tulsi leaves", "1 tsp coriander seeds", "1 cup water"],
        instructions: "Boil tulsi leaves and coriander seeds in water for 5-7 minutes. Strain and drink warm.",
        prepTime: "10 minutes",
        benefits: "Anti-inflammatory and antibacterial properties that may soothe UTI symptoms."
      },
      {
        id: 'uti-6',
        title: 'Jeera (Cumin) Water',
        ingredients: ["1 tsp cumin seeds", "1 cup water"],
        instructions: "Boil cumin seeds in water for 5 minutes. Strain and drink warm.",
        prepTime: "7 minutes",
        benefits: "Helps reduce burning sensation and promotes urinary tract health."
      }
    ],
    hormonal: [
      {
        id: 'hormonal-1',
        title: "Seed Cycling Energy Balls",
        ingredients: ["2 tbsp ground flaxseeds", "2 tbsp ground pumpkin seeds", "1/4 cup almond butter", "1 tbsp honey", "2 tbsp cacao nibs"],
        instructions: "Mix all ingredients. Form into small balls and refrigerate. Eat 2 daily during the first half of your cycle.",
        prepTime: "15 minutes",
        benefits: "Supports estrogen balance with lignans from flaxseeds and zinc from pumpkin seeds."
      },
      {
        id: 'hormonal-2',
        title: "Maca Root Latte",
        ingredients: ["1 tsp maca powder", "1 cup warm plant milk", "1/2 tsp cinnamon", "1 tsp coconut oil", "1 tsp honey"],
        instructions: "Blend all ingredients until frothy. Drink in the morning.",
        prepTime: "5 minutes",
        benefits: "Maca is an adaptogen that may help balance hormones and reduce stress."
      },
      {
        id: 'hormonal-3',
        title: 'Turmeric & Ashwagandha Tonic',
        ingredients: ["1/2 tsp turmeric powder", "1/4 tsp ashwagandha powder", "1 cup warm almond milk", "1/2 tsp honey (optional)"],
        instructions: "Mix all ingredients in warm milk. Stir well and drink before bedtime.",
        prepTime: "5 minutes",
        benefits: "Helps manage cortisol levels, reduce stress, and support hormonal balance."
      },
      {
        id: 'hormonal-4',
        title: 'Sesame & Jaggery Ladoo',
        ingredients: ["1/2 cup sesame seeds", "1/4 cup jaggery", "1 tbsp ghee"],
        instructions: "Roast sesame seeds, melt jaggery in ghee, mix together, form into small ladoos. Eat one daily.",
        prepTime: "20 minutes",
        benefits: "Rich in calcium, magnesium, and healthy fats to support hormonal health."
      },
      {
        id: 'hormonal-5',
        title: 'Holy Basil (Tulsi) Tea',
        ingredients: ["5-6 fresh tulsi leaves", "1 cup water", "1/2 tsp honey (optional)"],
        instructions: "Boil tulsi leaves in water for 5 minutes. Strain and drink warm.",
        prepTime: "10 minutes",
        benefits: "Supports adrenal health, reduces stress, and promotes hormonal balance."
      },
      {
        id: 'hormonal-6',
        title: 'Fenugreek & Fennel Infusion',
        ingredients: ["1 tsp fenugreek seeds", "1/2 tsp fennel seeds", "1 cup hot water"],
        instructions: "Steep fenugreek and fennel seeds in hot water for 10 minutes. Strain and drink warm.",
        prepTime: "12 minutes",
        benefits: "May support estrogen balance and improve digestion, aiding hormonal health."
      }
    ],
    pregnancy: [
      {
        id: 'pregnancy-1',
        title: "Morning Ginger Biscuits",
        ingredients: ["1 cup whole wheat flour", "1/4 cup molasses", "2 tbsp fresh grated ginger", "1/4 cup coconut oil", "1/2 tsp baking soda"],
        instructions: "Mix ingredients, form small cookies, bake at 350°F for 10-12 minutes. Eat 1-2 before getting out of bed.",
        prepTime: "20 minutes",
        benefits: "Ginger helps calm nausea; eating before rising helps stabilize blood sugar."
      },
      {
        id: 'pregnancy-2',
        title: "Lemon & B6 Morning Tonic",
        ingredients: ["1 lemon, juiced", "1 cup cold water", "1/4 tsp sea salt", "B6-rich foods: banana slice or avocado on the side"],
        instructions: "Mix lemon juice, water, and salt. Sip slowly upon waking and pair with B6-rich food.",
        prepTime: "3 minutes",
        benefits: "Vitamin B6 and electrolytes help manage nausea and prevent dehydration."
      },
      {
        id: 'pregnancy-3',
        title: 'Ajwain & Jeera Digestion Tea',
        ingredients: ["1/2 tsp ajwain (carom seeds)", "1/2 tsp jeera (cumin seeds)", "1 cup water"],
        instructions: "Boil ajwain and jeera in water for 5 minutes. Strain and drink warm after meals.",
        prepTime: "7 minutes",
        benefits: "Aids digestion, reduces bloating, and relieves nausea during pregnancy."
      },
      {
        id: 'pregnancy-4',
        title: 'Coconut & Dates Energy Shake',
        ingredients: ["1 cup coconut milk", "2-3 dates", "1/2 banana", "1/2 tsp cardamom powder"],
        instructions: "Blend all ingredients until smooth. Drink in the morning for sustained energy.",
        prepTime: "5 minutes",
        benefits: "Provides natural iron, potassium, and energy to support pregnancy nutrition."
      },
      {
        id: 'pregnancy-5',
        title: 'Saffron & Almond Milk',
        ingredients: ["1 cup warm milk", "2-3 saffron strands", "4-5 crushed almonds"],
        instructions: "Soak saffron in warm milk for 5 minutes, add crushed almonds, and drink at bedtime.",
        prepTime: "10 minutes",
        benefits: "Traditionally believed to support digestion, mood, and healthy skin for mother and baby."
      },
      {
        id: 'pregnancy-6',
        title: 'Fennel & Mint Cooling Drink',
        ingredients: ["1 tsp fennel seeds", "5-6 fresh mint leaves", "1 cup cold water"],
        instructions: "Soak fennel seeds in water overnight, add mint leaves in the morning, and drink cool.",
        prepTime: "5 minutes (plus overnight soaking)",
        benefits: "Soothes the stomach, reduces heartburn, and keeps the body cool during pregnancy."
      }
    ],
    anxiety: [
      {
        id: 'anxiety-1',
        title: "Lavender Chamomile Calm Tea",
        ingredients: ["1 tbsp dried chamomile flowers", "1 tsp dried lavender buds", "1 cup hot water", "1 tsp honey", "Lemon slice"],
        instructions: "Steep herbs in hot water for 5-7 minutes. Strain, add honey and lemon. Sip slowly while practicing deep breathing.",
        prepTime: "10 minutes",
        benefits: "Both herbs contain compounds that reduce anxiety and promote relaxation."
      },
      {
        id: 'anxiety-2',
        title: "Magnesium-Rich Stress Relief Bath",
        ingredients: ["2 cups Epsom salts", "5 drops lavender essential oil", "1/4 cup baking soda", "Warm bath water"],
        instructions: "Add all ingredients to warm bath. Soak for 20 minutes while practicing mindfulness.",
        prepTime: "5 minutes + 20 minutes soaking",
        benefits: "Magnesium absorption through skin helps relax muscles and calm nervous system."
      },
      {
        id: 'anxiety-3',
        title: 'Ashwagandha & Warm Milk Tonic',
        ingredients: ["1/2 tsp ashwagandha powder", "1 cup warm milk", "1/2 tsp honey (optional)", "A pinch of cinnamon"],
        instructions: "Mix ashwagandha and cinnamon into warm milk. Stir well and drink before bedtime.",
        prepTime: "5 minutes",
        benefits: "Ashwagandha is an adaptogen that helps reduce stress and promote relaxation."
      },
      {
        id: 'anxiety-4',
        title: 'Tulsi & Brahmi Herbal Tea',
        ingredients: ["5-6 fresh tulsi leaves", "1/2 tsp dried brahmi", "1 cup hot water", "1 tsp honey (optional)"],
        instructions: "Steep tulsi and brahmi in hot water for 7 minutes. Strain, add honey, and drink warm.",
        prepTime: "10 minutes",
        benefits: "Tulsi and brahmi are Ayurvedic herbs known for their calming and brain-boosting properties."
      },
      {
        id: 'anxiety-5',
        title: 'Banana & Almond Smoothie',
        ingredients: ["1 banana", "1/2 cup almond milk", "5 soaked almonds", "1/2 tsp flaxseeds", "1/2 tsp honey"],
        instructions: "Blend all ingredients until smooth. Drink in the morning or before bed.",
        prepTime: "5 minutes",
        benefits: "Rich in magnesium and tryptophan, which help support relaxation and better sleep."
      },
      {
        id: 'anxiety-6',
        title: 'Coconut & Cardamom Stress Reliever',
        ingredients: ["1/2 cup fresh coconut water", "1/4 tsp cardamom powder", "1/2 tsp honey (optional)"],
        instructions: "Mix all ingredients well and drink fresh for instant calm.",
        prepTime: "2 minutes",
        benefits: "Coconut water hydrates and replenishes electrolytes, while cardamom has mood-boosting properties."
      }
    ]
  };

  const healthFortunes = [
    "Your body needs hydration today. Drink a cup of warm water with lemon to cleanse your system.",
    "Listen to your energy levels. A 10-minute meditation will restore your balance today.",
    "Your hormones would benefit from seed cycling this week. Try adding pumpkin seeds to your meals.",
    "A warm compress on your lower abdomen will bring relief from discomfort today.",
    "Your body is craving movement. Gentle stretching will improve your circulation and mood.",
    "Today, nourish your gut with probiotic-rich foods to improve your overall wellbeing.",
    "Your sleep quality affects your hormonal balance. Try a technology-free hour before bed tonight.",
    "Breathing deeply activates your parasympathetic nervous system. Take 5 deep breaths now.",
    "Your body would benefit from an anti-inflammatory boost. Try adding turmeric to your next meal.",
    "A cup of spearmint tea today may help balance your hormones naturally.",
    "Massaging your feet before bed tonight will help you relax and improve circulation.",
    "Today is ideal for a detoxifying dry brush before your shower to stimulate lymphatic flow.",
    "A spoonful of soaked sabja (basil) seeds in water will keep you cool and aid digestion.",
    "Start your morning with a glass of jeera (cumin) water for better metabolism and digestion.",
    "A warm cup of haldi doodh (turmeric milk) at night will help you sleep better and reduce inflammation.",
    "Sitting in Vajrasana for 5 minutes after meals will improve digestion and prevent bloating.",
    "A handful of soaked almonds in the morning will give you an energy boost and improve brain function.",
    "Applying coconut oil to your scalp before bed will promote hair growth and relieve stress.",
    "Chewing a few tulsi leaves on an empty stomach can boost your immunity and reduce stress.",
    "Spending 10 minutes in the morning sunlight will help boost your vitamin D levels naturally.",
    "Drink a glass of fresh coconut water today to stay hydrated and maintain electrolyte balance.",
    "Add a pinch of ajwain (carom seeds) to warm water for instant relief from acidity and bloating.",
    "Applying a paste of sandalwood and rosewater can help soothe heat rashes and refresh your skin.",
    "Practicing anulom vilom (alternate nostril breathing) for 5 minutes can reduce stress and anxiety.",
    "Drinking warm ginger tea after meals can aid digestion and prevent bloating.",
    "Massaging your soles with mustard oil before bed can improve sleep and strengthen immunity.",
    "A simple bowl of khichdi can act as a detox meal, giving your digestive system a break.",
    "Rubbing a slice of potato on dark circles can naturally lighten them over time.",
    "Adding a pinch of hing (asafoetida) to your meals can prevent bloating and aid digestion.",
    "Wearing cotton clothes during hot weather will help your skin breathe and reduce heat rashes.",
    "Applying aloe vera gel on your face overnight can help soothe sunburns and reduce acne.",
    "Soaking your feet in warm salt water will relieve stress and improve circulation after a long day."
];


  // Get all recipes for search functionality
  const getAllRecipes = () => {
    let allRecipes = [];
    Object.keys(remedyRecipes).forEach(category => {
      remedyRecipes[category].forEach(recipe => {
        allRecipes.push({
          ...recipe,
          category
        });
      });
    });
    return allRecipes;
  };

  // Search functionality with debounce
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  const filteredRecipes = () => {
    if (!debouncedSearchQuery) return [];
    
    const allRecipes = getAllRecipes();
    return allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      recipe.ingredients.some(i => i.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) ||
      recipe.benefits.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  };

  // Get favorite recipes
  const getFavoriteRecipes = () => {
    const allRecipes = getAllRecipes();
    return allRecipes.filter(recipe => favoriteRecipes.includes(recipe.id));
  };

  const toggleFavorite = (recipeId, event) => {
    if (event) event.stopPropagation();
    
    setFavoriteRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const openFortuneCookie = () => {
    setFortuneAnimation(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * healthFortunes.length);
      setFortuneCookie({ 
        message: healthFortunes[randomIndex], 
        opened: true 
      });
      setFortuneAnimation(false);
    }, 1000);
  };

  const resetFortuneCookie = () => {
    setFortuneCookie({ message: '', opened: false });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Save favorites to local storage
  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  }, [favoriteRecipes]);

  // Load favorites from local storage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteRecipes');
    if (savedFavorites) {
      setFavoriteRecipes(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 to-purple-50 ml-60">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile sidebar toggle */}
      <div className="md:hidden absolute top-4 left-4 z-30">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition-all"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <div className="w-5 h-5 flex flex-col justify-center space-y-1">
            <span className="block w-5 h-0.5 bg-white"></span>
            <span className="block w-4 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </div>}
        </button>
      </div>
      
      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={toggleMobileMenu}>
          <div className="w-64 h-full bg-white shadow-lg transform transition-transform" onClick={e => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-4">
          {selectedRecipe ? (
            <DetailedRecipeView 
              recipe={selectedRecipe} 
              categoryIcon={healthCategories.find(c => c.id === selectedRecipe.category)?.icon}
              isFavorite={favoriteRecipes.includes(selectedRecipe.id)}
              onToggleFavorite={(e) => toggleFavorite(selectedRecipe.id, e)}
              onBack={() => setSelectedRecipe(null)}
            />
          ) : (
            <>
              <header className="mb-8 text-center pt-6">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700 mb-2">Women's Wellness Remedies</h1>
                <p className="text-pink-600 text-lg">Natural solutions for common women's health concerns</p>
                
                {/* Search bar */}
                <div className="mt-6 relative max-w-xl mx-auto group mr-[300px]">
                  <input
                    type="text"
                    placeholder="Search remedies, ingredients, benefits..."
                    className="w-[800px] px-2 py-3 pl-12 pr-10 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm transition-all group-hover:shadow-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearching(true)}
                  />
                  <div className="absolute left-4 top-3.5 text-pink-400">
                    <Search size={18} />
                  </div>
                  {searchQuery && (
                    <button 
                      className="absolute right-4 top-3.5 text-pink-400 hover:text-pink-600 transition-colors"
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearching(false);
                      }}
                      aria-label="Clear search"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </header>
              
              {isSearching && searchQuery ? (
                <div className="mb-8 animate-fadeIn">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-pink-800">Search Results</h2>
                    <button 
                      className="flex items-center text-pink-600 hover:text-pink-800 transition-colors"
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearching(false);
                      }}
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Back to Remedies
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes().map((recipe, index) => (
                      <RecipeCard 
                        key={recipe.id}
                        recipe={recipe}
                        categoryIcon={healthCategories.find(c => c.id === recipe.category)?.icon}
                        isFavorite={favoriteRecipes.includes(recipe.id)}
                        onToggleFavorite={(e) => toggleFavorite(recipe.id, e)}
                        onClick={() => setSelectedRecipe(recipe)}
                        animationDelay={index * 0.05}
                      />
                    ))}
                  </div>
                  {filteredRecipes().length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <div className="text-4xl mb-4">🔍</div>
                      <p className="text-pink-700 mb-2">No remedies found matching your search.</p>
                      <p className="text-pink-500 text-sm">Try different keywords or browse categories instead.</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <nav className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-1 flex">
                      <button 
                        onClick={() => setActiveTab('recipes')}
                        className={`flex items-center px-6 py-2 rounded-lg transition-all duration-300 ${activeTab === 'recipes' ? 'bg-pink-600 text-white shadow-md' : 'text-pink-800 hover:bg-pink-100'}`}
                      >
                        <BookOpenIcon size={18} className="mr-2" />
                        Remedy Recipes
                      </button>
                      <button 
                        onClick={() => setActiveTab('fortune')}
                        className={`flex items-center px-6 py-2 rounded-lg transition-all duration-300 ${activeTab === 'fortune' ? 'bg-pink-600 text-white shadow-md' : 'text-pink-800 hover:bg-pink-100'}`}
                      >
                        <Cookie size={18} className="mr-2" />
                        Health Fortune
                      </button>
                    </div>
                  </nav>
                  
                  {activeTab === 'recipes' && (
                    <div className="animate-fadeIn">
                      <div className="flex flex-wrap md:flex-nowrap md:space-x-4 mb-6">
                        {/* Category tabs */}
                        <div className="w-full">
                          <div className="flex flex-wrap gap-3 justify-center"> 
                          <div className="flex space-x-5">
                              {healthCategories.slice(0,6).map(category => (
                                <button
                                  key={category.id}
                                  onClick={() => {
                                    setSelectedCategory(category.id);
                                    setShowFavorites(false);
                                  }}
                                  className={`p-3 px-4 rounded-lg flex items-center whitespace-nowrap transition-all ${
                                    selectedCategory === category.id && !showFavorites
                                      ? 'bg-pink-600 text-white shadow-md transform scale-105'
                                      : 'bg-white text-pink-800 hover:bg-pink-100'
                                  }`}
                                >
                                  <span className="text-xl mr-2">{category.icon}</span>
                                  <span className="font-medium">{category.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Favorites toggle */}
                        <div className="w-full mt-20  relative left-[-650px]  flex justify-center">
                          <button
                            onClick={() => setShowFavorites(!showFavorites)}
                            className={`p-3 rounded-lg w-40 h-12 flex items-center justify-center w-full transition-all ${
                              showFavorites
                                ? 'bg-pink-600 text-white shadow-md'
                                : 'bg-white text-pink-800 hover:bg-pink-100'
                            }`}
                          >
                            <HeartIcon size={18} className={`mr-3 mt-1 ${showFavorites ? 'fill-white' : ''}`} />
                            <span className="font-medium text-xl">Favorites</span>
                          </button>
                        </div>
                      </div>
                      
                      {showFavorites ? (
                        <div>
                          <h2 className="text-xl font-bold text-pink-800 mb-4 flex items-center">
                            <HeartIcon size={20} className="mr-2 text-pink-600" /> 
                            Your Favorite Remedies
                          </h2>
                          
                          {getFavoriteRecipes().length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {getFavoriteRecipes().map((recipe, index) => (
                                <RecipeCard 
                                  key={recipe.id}
                                  recipe={recipe}
                                  categoryIcon={healthCategories.find(c => c.id === recipe.category)?.icon}
                                  isFavorite={true}
                                  onToggleFavorite={(e) => toggleFavorite(recipe.id, e)}
                                  onClick={() => setSelectedRecipe(recipe)}
                                  animationDelay={index * 0.05}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                              <div className="text-4xl mb-4">💝</div>
                              <p className="text-pink-700 mb-2">You haven't saved any favorites yet.</p>
                              <p className="text-pink-500 text-sm">Star recipes you love to find them here!</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <h2 className="text-xl font-bold text-pink-800 mb-4 flex items-center">
                            <span className="mr-2">{healthCategories.find(c => c.id === selectedCategory)?.icon}</span>
                            {healthCategories.find(c => c.id === selectedCategory)?.name} Remedies
                          </h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {remedyRecipes[selectedCategory].map((recipe, index) => (
                              <RecipeCard 
                                key={recipe.id}
                                recipe={recipe}
                                categoryIcon={healthCategories.find(c => c.id === selectedCategory)?.icon}
                                isFavorite={favoriteRecipes.includes(recipe.id)}
                                onToggleFavorite={(e) => toggleFavorite(recipe.id, e)}
                                onClick={() => setSelectedRecipe(recipe)}
                                animationDelay={index * 0.05}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                  )}
                  
                  {activeTab === 'fortune' && (
                    <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
                      <div className="mb-8 text-center max-w-md">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800 mb-2">Health Fortune Cookie</h2>
                        <p className="text-amber-600">Tap the cookie to reveal a wellness tip tailored just for you</p>
                      </div>
                      
                      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                        {!fortuneCookie.opened ? (
                          <button 
                            onClick={openFortuneCookie}
                            className={`w-48 h-48 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all ${fortuneAnimation ? 'animate-pulse' : 'hover:scale-105'}`}
                            aria-label="Open fortune cookie"
                          >
                            <div className="text-6xl transform -rotate-12 mb-10 hover:rotate-12 transition-transform">🥠</div>
                            <div className="absolute mt-28 text-sm font-medium text-amber-800 bg-white bg-opacity-70 px-3 py-1 rounded-full shadow-sm">Tap to open</div>
                          </button>
                        ) : (
                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-lg shadow-lg max-w-md text-center border border-amber-200 animate-fadeIn">
                            <p className="text-lg font-medium text-amber-800 mb-6 italic">"{fortuneCookie.message}"</p>
                            <button 
                              onClick={resetFortuneCookie}
                                className="flex items-center justify-center w-60 h-16 px-4 py-2 bg-amber-200 text-amber-800 text-sm font-semibold rounded-lg hover:bg-amber-300 transition-all shadow-sm hover:shadow-lg"
                              aria-label="Try another fortune"
                            >
                              <RotateCcw size={16} className="mr-2" />
                              Try Another Fortune
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center max-w-md text-amber-700 bg-white p-6 rounded-lg shadow-sm border border-amber-100">
                        <h3 className="font-medium mb-2">About Health Fortunes</h3>
                        <p>These daily wisdom "cookies" are designed to gently guide you toward better health habits. Each tip is rooted in traditional wisdom and modern wellness practices for women's health.</p>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              <footer className="mt-12 pt-8 border-t border-pink-200 text-center">
                <div className="max-w-lg mx-auto">
                  <div className="mb-6 bg-pink-50 p-4 rounded-lg border border-pink-200 inline-block">
                    <div className="flex items-center text-pink-700 text-sm">
                      <Info size={16} className="mr-2 mb-4" />
                      <p>Always consult with a healthcare provider before trying new remedies or if symptoms persist.</p>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-6 mb-4">
                    <a href="#" className="text-pink-500 hover:text-pink-700 transition-colors">Privacy Policy</a>
                    <a href="#" className="text-pink-500 hover:text-pink-700 transition-colors">Terms of Use</a>
                    <a href="#" className="text-pink-500 hover:text-pink-700 transition-colors">Contact Us</a>
                  </div>
                  <p className="text-pink-400 text-sm">© 2025 Women's Wellness Remedies</p>
                </div>
              </footer>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Recipe Card Component
const RecipeCard = ({ recipe, categoryIcon, isFavorite, onToggleFavorite, onClick, animationDelay = 0 }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-all cursor-pointer transform hover:-translate-y-1 animate-fadeIn "
      style={{ animationDelay: `${animationDelay}s` }}
      onClick={onClick}
    >
      <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-4 relative">
        <button 
          className="absolute right-4 top-4 z-10 bg-white bg-opacity-70 rounded-full p-1.5 shadow-sm hover:shadow transition-all"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star 
            size={16} 
            className={`${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-pink-600'} transition-all`} 
          />
        </button>
        
        <h3 className="text-lg font-bold text-pink-800 flex items-center pr-8">
          <span className="mr-2">{categoryIcon}</span> 
          {recipe.title}
        </h3>
        <p className="text-pink-600 text-xs flex items-center mt-1">
          <Clock size={12} className="mr-1" /> {recipe.prepTime}
        </p>
      </div>
      
      <div className="p-4">
        <div className="max-h-24 overflow-hidden relative">
          <div className="mb-2">
            <h4 className="font-medium text-pink-700 text-sm mb-1">Ingredients:</h4>
            <p className="text-gray-600 text-sm truncate">{recipe.ingredients.join(", ")}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-pink-700 text-sm mb-1">Benefits:</h4>
            <p className="text-gray-600 text-sm line-clamp-2">{recipe.benefits}</p>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-pink-500">{recipe.ingredients.length} ingredients</span>
          <div className="flex items-center text-pink-600 hover:text-pink-800 text-sm font-medium transition-colors">
            View details
            <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Detailed Recipe View Component
const DetailedRecipeView = ({ recipe, categoryIcon, isFavorite, onToggleFavorite, onBack }) => {
  const [activeSection, setActiveSection] = useState('instructions');
  
  return (
    <div className="animate-fadeIn">
      <button 
        onClick={onBack}
        className="flex items-center text-pink-600 hover:text-pink-800 mb-4 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Remedies
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-6 relative text-white">
          <button 
            className="absolute right-4 top-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star 
              size={20} 
              className={`${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white'} transition-all`} 
            />
          </button>
          
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{categoryIcon}</span>
            <span className="text-pink-200 font-medium">
              {recipe.category && healthCategories.find(c => c.id === recipe.category)?.name}
            </span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
          
          <div className="flex items-center">
            <Clock size={16} className="mr-1" /> 
            <span className="text-sm">Prep time: {recipe.prepTime}</span>
          </div>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeSection === 'instructions' ? 'text-pink-700 border-b-2 border-pink-600' : 'text-gray-500 hover:text-pink-600'}`}
            onClick={() => setActiveSection('instructions')}
          >
            Instructions
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeSection === 'ingredients' ? 'text-pink-700 border-b-2 border-pink-600' : 'text-gray-500 hover:text-pink-600'}`}
            onClick={() => setActiveSection('ingredients')}
          >
            Ingredients
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeSection === 'benefits' ? 'text-pink-700 border-b-2 border-pink-600' : 'text-gray-500 hover:text-pink-600'}`}
            onClick={() => setActiveSection('benefits')}
          >
            Benefits
          </button>
        </div>
        
        {/* Content sections */}
        <div className="p-6">
          {activeSection === 'instructions' && (
            <div className="animate-fadeIn">
              <h2 className="text-lg font-bold text-pink-800 mb-4">How to Prepare</h2>
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-100 mb-6">
                <p className="text-gray-800">{recipe.instructions}</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                <h3 className="text-pink-700 font-medium mb-2 flex items-center">
                  <Info size={16} className="mr-2" />
                  Tips for Best Results
                </h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Prepare fresh for maximum benefits</li>
                  <li>Use organic ingredients when possible</li>
                  <li>Adjust quantities to your personal preference</li>
                  <li>For persistent symptoms, consult a healthcare professional</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeSection === 'ingredients' && (
            <div className="animate-fadeIn">
              <h2 className="text-lg font-bold text-pink-800 mb-4">Ingredients</h2>
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-100 mb-6">
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-pink-200 flex items-center justify-center text-pink-700 font-medium mr-3 mt-0.5">
                        {i+1}
                      </div>
                      <span className="text-gray-800">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                <h3 className="text-pink-700 font-medium mb-2 flex items-center">
                  <Info size={16} className="mr-2" />
                  Ingredient Substitutions
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Honey can be replaced with maple syrup</li>
                  <li>• Fresh herbs can be substituted with dried (use 1/3 of the quantity)</li>
                  <li>• Plant milk varieties can be interchanged based on preference</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeSection === 'benefits' && (
            <div className="animate-fadeIn">
              <h2 className="text-lg font-bold text-pink-800 mb-4">Health Benefits</h2>
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-100 mb-6">
                <p className="text-gray-800">{recipe.benefits}</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                <h3 className="text-pink-700 font-medium mb-2 flex items-center">
                  <CircleHelpIcon size={16} className="mr-2" />
                  When to Use This Remedy
                </h3>
                <p className="text-gray-700 mb-4">This remedy works best when used consistently at the first sign of symptoms. Results may vary between individuals.</p>
                
                <div className="bg-white p-3 rounded border border-pink-200">
                  <p className="text-pink-700 text-sm italic">Remember: Always consult with a healthcare professional for persistent or severe symptoms.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Additional components
const Clock = ({ size = 24, className }) => {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="6" x2="12" y2="12" />
        <line x1="12" y1="12" x2="16" y2="14" />
      </svg>
    );
  }

export default Remedies;